const fetch = require('node-fetch');

/*
 * Klaviyo
 */
class Klaviyo {
  constructor(options = { apiKey: null }) {
    ({ apiKey: this.apiKey } = options); // destructure class properties
    if (!this.apiKey) throw new Error('apiKey is required option');
    this.internalPropertyNames = ['longitude','email','latitude','address','address2','title','timezone','organization','state_region','last_name','phone','country','zip','first_name','city', 'klaviyo_id', 'referralcode'];
    this.baseUrl = 'https://a.klaviyo.com/api/v1/'
  }

  async getProfile(klaviyoId) {
    return await this.send(`${this.baseUrl}person/${klaviyoId}`);
  }

  async updateProfile(klaviyoId, data) {
    data.object = 'person';
    const payload = this.formatPayload(data);
    await this.send(`${this.baseUrl}person/${klaviyoId}`,payload, { method: 'PUT'});
  }

  async send(url, payload = null, options = { method: 'GET' }) {
    const { method } = options;
    const headers = new fetch.Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded"); 
    
    // TODO: This could be improved - THE API needs the key on the querystring if get request else it is in the body.
    if (method.toLocaleLowerCase() === 'get') {
      url = `${url}?api_key=${this.apiKey}`
    }
    const requestOptions = {
      method,
      headers,
      ...((payload) ? { body: payload } : {}),
      redirect: 'manual'
    };
    const response = await fetch(url, requestOptions)
    return this.parseResponse(response);
  }

  async parseResponse(response) {
    const results = await response.json() ;
    if (results.status && results.status != 200) {
      throw new Error(results.message).results = results;
    }
    return results;
  }

  formatInternalProperties(data) {
    return {
      object: data.object,
      ...((data.external_id) ? {$id: data.external_id} : {}),
      ...((data.email) ? {$email: data.email} : {}),
      ...((data.latitude) ? {$latitude: data.latitude} : {}),
      ...((data.address) ? {$address1: data.address} : {}),
      ...((data.address2) ? {$address2: data.address2} : {}),
      ...((data.title) ? {$title: data.title} : {}),
      ...((data.timezone) ? {$timezone: data.timezone} : {}),
      ...((data.organization) ? {$organization: data.organization} : {}),
      ...((data.state_region) ? {$region: data.state_region} : {}),
      ...((data.last_name) ? {$last_name: data.last_name} : {}),
      ...((data.phone) ? {$phone_number: data.phone} : {}),
      ...((data.country) ? {$country: data.country} : {}),
      ...((data.zip) ? {$zip: data.zip} : {}),
      ...((data.first_name) ? {$first_name: data.first_name} : {}),
      ...((data.city) ? {$city: data.city}: {})
    };
  }

  formatProperties(data) {
    const properties = {
      ...this.formatInternalProperties(data)
    }
    // EXCLUDE THE INTERNAL PROPERTIES
    for (const key in data) {
      if (!this.internalPropertyNames.includes(key)) {
        properties[key] = data[key];
      };
    }
    return properties;
  }

  formatPayload(data) {
    const urlencodedData = new URLSearchParams();
    urlencodedData.append("api_key", this.apiKey);
    if (data) {
      const properties = this.formatProperties(data);
      for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
          urlencodedData.append(key, properties[key]);
        }
      }
    }
    return urlencodedData;
  }
}

module.exports = Klaviyo;
