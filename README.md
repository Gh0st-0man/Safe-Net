 # SafeNet 
 **Chrome Browser extension that enables you to manipulate your cookies and scan any URL using DeBERTa NLP finetuned on detecting phishing urls.** 
 

> A quick start guide to getting the backend and frontend up and running.

## Normal users installition guide 
**FrontEnd** 

- clone the repo with:
```
git clone https://github.com/Gh0st-0man/Safe-Net.git

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

<img width="1266" height="603" alt="safenet4" src="https://github.com/user-attachments/assets/c12704f2-a459-446f-8db6-949f5d4ccd73" />
<img width="598" height="605" alt="safenet3" src="https://github.com/user-attachments/assets/34e1cbd9-93a4-41d1-9da5-f422e5f04df5" />
<img width="598" height="605" alt="SafeNet2" src="https://github.com/user-attachments/assets/2484304e-b97c-4bfd-b44a-5ae2e235b0cb" />
<img width="598" height="605" alt="Safenet_1" src="https://github.com/user-attachments/assets/0545075c-12dd-449d-80f8-8904a14afd5d" />














---------------------------------------------------------------------------------------------------------------------
## For Developers ##
























