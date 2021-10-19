# Unified login and authentication architecture

---


## Task 
Design and Build a Unified login and authentication architecture

## **Solutions**

Creating seprate server only for authentication and authorization.
For example if a company have two different applications, for which we have to implement unified login authentication, then user try to acess authenticated routes this will redirect user to authentication server and after authentication user can acess protected routes. 
If user has already authorized for one application then there is no need to authorizes for second application until session is not expired.

I implemented this using **KEYCLOAK** -SSO (single sign-on)  which is opensource and better option.

## Running Project 
For running project locally,


should have nodejs installed and then run 

    npm install
to install all dependencies

Download [Keycloak](https://github.com/keycloak/keycloak/releases/download/15.0.2/keycloak-15.0.2.zip) and unzip. 

move to keycloak-15.02/bin and run standalone.bat file 

    cd SERVER_1\keycloak-15.0.2\bin
    standalone.bat

Now you can run both applictions with SSO


#### **Note- you may need to configure [Keycloak](https://www.keycloak.org/docs/latest/getting_started/) dashboard, configure it and change keycloak.json files accordingly**

