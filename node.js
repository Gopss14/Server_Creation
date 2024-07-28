//server creation

//step 1: create a json package . for that open the terminal and type "npm init". after this a package.json will be created.
//step 2: after writing the server creation code. In the terminal , type " node node.js ". That is node <file name>.  Run it by pressing enter key
//if the broswer doesn't open. Go to any browser , type "local host:<port_no>". in my case , local host:8081. run it , the server started.


/*const http = require("http");
const port = 8081;
 http
   .createServer((req , res)=>{
    res.writeHead(200 , {"content-Type":"text/html"});
    res.write("<h2>server started successfully</h2>");
    res.end();
   }) 
   .listen(port , ()=>{
    console.log('nodejs server started running on the port: ${port}');
   }); */

// if i edit the code, i cannot see the updation in the web page, so i need to kill the terminal and should be restarted. rather than 
//killing and restarting, i can use a third party application called "nodemon" which will helps in updation.
//simply type "npm i nodemon" in the terminal for installing nodemon. After installing, type "nodemon node.js" so whenever you modify the
//code ,it'll automatically reflect on the server on reload.


//HTTP methods (refer notes)
// Using GET method
/*const http = require("http");
const port = 8081;
const todolist= ["learn" , "write", "read"];
 http
   .createServer((req , res)=>{
    const {method, url} = req;
    if(url === "/todo"){
      if(method === "GET"){
        res.writeHead(200);
        res.write(todolist.toString());
      }
    }
    res.end();
   }) 
   .listen(port , ()=>{
    console.log('nodejs server started running on the port: ${port}');
   }); */

//output: open localhost:8081/todo >> inspect >> network >> refresh the page >> todo>>  request >> u'll able to see the todolis array. 


/*
const http = require("http");
const port = 8081;
const todolist= ["learn" , "write", "read"];
 http
   .createServer((req , res)=>{
    const {method, url} = req;
    if(url === "/todo"){
      if(method === "GET"){
        res.writeHead(200);
        res.write(todolist.toString());
      }else if(method === "POST"){
        let body="";
        req.on('error', (err)=>{
          console.log(err);
        })
        .on('data', (chunk)=>{
          body += chunk;
        })
        .on('end', ()=>{
          body = JSON.parse(body);
          console.log("data:", body);
        })
      }else{
        res.writeHead(501);
      }
    }else{
      res.writeHead(404);
    }
    res.end();
   }) 
   .listen(port , ()=>{
    console.log('nodejs server started running on the port: ${port}');
   });
 */

//output: go to thunder client >> new request >> paste the url http://localhost:8081/todo >> POST method >> body >> json >>
// type a simple json formate text >> run >> u can see the output in terminal because of console.log("data:", body);
   

/*const http = require("http");
const port = 8081;
const todolist= ["learn" , "write", "read"];
 http
   .createServer((req , res)=>{
    const {method, url} = req;
    if(url === "/todo"){
      if(method === "GET"){
        res.writeHead(200);
        res.write(todolist.toString());
      }else if(method === "POST"){
        let body="";
        req.on('error', (err)=>{
          console.log(err);
        })
        .on('data', (chunk)=>{
          body += chunk;
        })
        .on('end', ()=>{
          body = JSON.parse(body);
          let newtodo = todolist; // create the new array copy the elements from the existing array 
          newtodo.push(body.item); //i want to add a new item . so i am creating the new item in json format and POST it . the i go back to GET , i can see the new updated array.
          console.log("data:", newtodo);
        })
      }else if(method === "DELETE"){
        let body="";
        req.on('error', (err)=>{
          console.error(err);
        })
        .on('data', (chunk)=>{
          body += chunk;
        })
        .on('end', ()=>{
          body = JSON.parse(body);
          let deleted_item = body.item;//get the item that need to be deleted in the body. as {"item":"read"} then >> DELETE >> GET 
          for( let i = 0; i< todolist.length; i++){
            if(todolist[i] === deleted_item){
              todolist.splice(i,1);
              break;
            }
          }
        })  
      }
      else{
        res.writeHead(501);
      }
    }else{
      res.writeHead(404);
    }
    res.end();
   }) 
   .listen(port , ()=>{
    console.log('nodejs server started running on the port: ${port}');
   }); */



// SERVER CREATION USING EXPRESS.js

const express = require("express");
const app = express();
app.use(express.json()); // explicitly saying our result should be in json format
const port = 8081;
const todolist = ["learn" , "write" , "read"];
app.get("/todo" , (req, res)=>{
  res.status(200).send(todolist);
});
app.post("/todo", (req , res)=>{
  let newitem = req.body.item;
  todolist.push(newitem);
  res.status(201).send({message: "task added successfully"});
});
app.delete("/todo", (req, res)=>{
  let deleted_item = req.body.item;//get the item that need to be deleted in the body. as {"item":"read"} then >> DELETE >> GET 
  for( let i = 0; i< todolist.length; i++){
    if(todolist[i] === deleted_item){
      todolist.splice(i,1);
      break;
    }
  }
  res.status(202).send({message: "item deleted"});
});
app.all("*", (req, res)=>{
  res.status(501).send();
});
app.listen(port ,()=>{
  console.log('nodejs server started running on the port: ${port}');
});

