

class Library {

    constructor(){
    }

    async Get(targetURL){ // Tested, Works
        let response;

        const requestOptions = {
            method: "GET",
            headers: {"content-type": "application/json"}
        };
        
        response = await this.#processFetch (targetURL, requestOptions);
        return await response.json();
    }

    async Post(targetURL, data){ // Having issues with response being undefined
        let response;

        const requestOptions = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        };
        response = await this.#processFetch (targetURL, requestOptions);
        return await response.json();
    }
    

    async Put(targetURL, data){ // Having issues with response being undefined
        let response;
    
        const requestOptions = {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        };
        response = await this.#processFetch (targetURL, requestOptions);
        return await response.json();
    }

    async Delete(targetURL) { // Somewhat Tested, Believed to Work
        let response;

        const requestOptions = {
            method: "DELETE",
            headers: {"content-type": "application/json"}
        };
        try {
            response = await this.#processFetch (targetURL, requestOptions);
            return await response.json();
        }
        catch (error) {
            return await response;
        }
    }
async patch(targetURL, data){
    let response;
    const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      response = await this.#processFetch(targetURL, requestOptions);
      return await response.json();
        
    }

    async #processFetch (targetURL, requestOptions) { 
        console.log("Requesting URL:", targetURL);
        try {
            var newURL = targetURL.slice(0, -2);
            console.log(newURL);
            let data = await fetch(targetURL, requestOptions);
            console.log(data.status);
            let afterUpdate = await fetch (targetURL, {
                method: "GET",
                headers: {"content-type": "application/json"}
            });
            return await afterUpdate;
        }catch (exception) { // outputs the error to the response
            throw exception;
        }
    }

}