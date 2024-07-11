1.

api/v1/user/signup - POST 
-body = {
    username: string, min3,max50,
    password: string, min3, max50,
    firstname: string, min3, max50,
    lastname: string, min3, max50,
}

-RESPONSE - {
    "msg": "User Created Successfully",
    "token": "jwt token to be stored in local storage"
}

2.

api/v1/user/signin - POST 

-body = {
    username: string, min3,max50,
    password: string, min3, max50,
}

-RESPONSE - {
    "token": "jwt token to be stored in local storage"
}

3.

api/v1/user/bulk?filter="name" - GET request

response - array of users with similar name 

4.

api/v1/account/balance - GET request

send auth headers too
 

 returns balance of a user

5.

api/v1/account/transfer - POST request

send auth headers

body - {
    to: userID of recipient,
    amount: number to be transfered
}

