####Application's [Report](https://github.com/CristianChris/Creating-Chat-Application-using-Message-Broker-technology-in-Node/blob/master/Report.pdf)
####Running the application:
In order to run our aplication we will need to install several tools for that:

1. [NodeJS](https://nodejs.org/en/) as a JavaScript environment
2. [Redis](http://redis.io/) as a message broker

After the installation, from our terminal we will need to run first our Redis service to serve us the brokering. For this just type the following command: ```redis-server```

Afterwards, open a new terminal instance and type the following command: ```node app [port]```

Note! We should be at the path where our project tree is located!

Instead of [port] you need to write what port you want to run this app on. You can open multiple instances of the application running on different ports, considering they are not running anohter process.
