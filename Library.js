


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
        return await response;
    }

    async Put(targetURL, data){ // Having issues with response being undefined
        let response;
    
        const requestOptions = {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        };
        response = await this.#processFetch (targetURL, requestOptions);
        return await response;
    }

    async Delete(targetURL) { // Somewhat Tested, Believed to Work
        let response;

        const tmp = await this.Get(targetURL);

        const requestOptions = {
            method: "DELETE",
            headers: {"content-type": "application/json"}
        };
        try {
            response = await this.#processFetch (targetURL, requestOptions);
            return await tmp;
        }
        catch (error) {
            return await response;
        }
    }
async patch(targetURL, data){

    fetch(targetURL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            
            console.log('Resource updated successfully');
          } else {
            // Handle errors
            console.error('Failed to update the resource');
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    }

    async #processFetch (targetURL, requestOptions) { 
        console.log("Requesting URL:", targetURL);
        try {

            let data = await fetch(targetURL, requestOptions);
            return data;
        }catch (exception) { // outputs the error to the response
            throw exception;
        }
    }

}