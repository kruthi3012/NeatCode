async function postRequest(url, data)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      let resp = await fetch(url, requestOptions)
          .then(response => response.json())
          .catch(function (error) { // Failure Callback
            console.log(error);
            return {"message" : "Error occured in calling for data for : " + data + ". Details : " + error};
          }); 
      console.log(resp);
      return resp;
}

export default postRequest;