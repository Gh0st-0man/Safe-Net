 # SafeNet 
 **Chrome Browser extension that enables you to manipulate your cookies and scan any URL using DeBERTa NLP finetuned on detecting phishing urls.** 
 

> A quick start guide to getting the backend and frontend up and running.

## Normal users installition guide 
**FrontEnd** 

- clone the repo with:
```
git clone https://github.com/Ghost-Oman/SafeNet.git

```


- Open chrome Browser and navigate to extensions page.... On the top left corner click on load unpacked and chose this Directory FrontEnd/safe-net/build/chrome-mv3-prod

- you have successfully loaded the extension. 

**Backend**
- Ensure you have Docker If not then download it from https://www.docker.com/

- open your terminal and write the following command to pull the backend container
```
docker pull azanmoha/fastapi-safenet
```

- ensure you are in this path  backend/ and then run 
```

docker run -d -p 5000:5000 --env-file ./app/.env --name url-scanner-api azanmoha/fastapi-safenet:latest
OR 
docker run -p 5000:5000 azanmoha/fastapi-safenet:latest           
```

- now the extension will be availabe with all its components on your localhost and you can connect to it on http://127.0.0.1:5000



---------------------------------------------------------------------------------------------------------------------
## For Developers ##
























