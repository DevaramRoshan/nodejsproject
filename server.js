const http= require("http");

const port= 8081;

const todoList = ["playcricket","play mobile games ","study hard","be productive everyday","help others"];

http.createServer((req,res)=>{
    const {method,url} = req;
    if(url==="/todos"){
        if(method==="GET"){
            // console.log("its a todos url , with a GET method ");
            res.writeHead(200,{"content-type": "text/html"});
            res.write(todoList.toString());
        }
        else if(method==="POST"){
            let body = "";
            req.on('error',(err)=>{
                console.log(err)
            }).on('data', (chunk)=>{
                body += chunk;
            }).on('end', ()=>{
                body = JSON.parse(body);
                console.log("data: ", body)
                let newToDo = todoList;
                newToDo.push(body.item);
            })
        }
        else if(method==="PUT"){
            
        }
        else if(method==="DELETE"){
            let body = "";
            req.on('error',(err)=>{
                console.log(err)
            }).on('data', (chunk)=>{
                body += chunk;
            }).on('end',()=>{
                body=JSON.parse(body);
                let deletethis=body.item;
                todoList.find((elem,index)=>{
                    if(elem===deletethis){
                        todoList.splice(index,1);
                    }
                })
            })
        }
        else{
            res.writeHead(501);
        }
    }
    
    res.end();
})

.listen(port,()=>{
    console.log(`port created on ${port}`);
})