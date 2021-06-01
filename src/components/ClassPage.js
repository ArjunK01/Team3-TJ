import React, {useState} from "react";
import {AuthProvider} from "./../context/AuthProvider"

export default function ClassPage(id) {
    const [c, setClass] = useState(null)
    // const [name, setName] = useState("");
    // const [teacher, setTeacher] = useState("");
    // const [roster, setRoster] = useState();
    let name, teacher, roster;
    const fetchClasses = () => {
        // let a, b, c, d;
        console.log("fetchClasses was called!");
        const url = new URL("http://localhost:8000/classes");

        fetch(url)
        .then((resp) => {
            return(resp.json());
        })
        .then((obj) => {
            console.log(obj);
            for(let element of obj) {
                if(element.classID === id.id)
                {
                    setClass(element);
                    // let {a, b, c, d} = element.keys;
                    // console.log("A:", a);
                    break;
                }
                else
                    name = "This class does not exist!"
                    
            } //ends for
        }) //ends then
    } //ends fetchClasses

    const rosterDisplay = () => {
        console.log("here")
        if(!roster)
            return;
        const nameList = <ul>
            {roster.map((cl) => (
                <div style = {{display: "flex", margin: "auto"}} key = {cl.student}>
                    <li>{cl.student}</li> <button onClick = {removeStudent}></button>
                </div>
            ))}
        </ul>
        return(nameList);
    }

    const removeStudent = () => {
        console.log("clicked")
    }

    if(c === null)
        fetchClasses();
    else
    {
        name = c.className;
        teacher = c.teacher;
        roster = c.roster;
    }

    return(
        <div>
            {console.log(c)}
            <h1>{name}</h1>
            <h3>{teacher}</h3>
            <h3>Roster</h3>
            {rosterDisplay()}

        </div>
    )
}

    
//     const theme = createMuiTheme();
//     theme.spacing(2);

//     const useStyles = makeStyles({
//         root: {
//             maxWidth: 300,
//             // minWidth: 300,
//         },
//         media: {
//             height: 250,
//             width: 150,
//         },
//         div: {
//             position: "relative",
//             margin: "auto",
//             textAlign: "center",
//             display: "inline",
//           }, //ends div style
//           button: {
//             backgroundColor: "#0047AB",
//             margin: theme.spacing("1.5%", "2.7%"),
//             border: "none",
//             color: "white",
//             padding: theme.spacing(".7%", "2%"),
//             textAlign: "center",
//             fontSize: "85%",
//             fontFamily: "Consolas",
//             '&:hover': {
//                 backgroundColor: "green",
//             }
//           }, //ends button style
//         }); 
//     const classes = useStyles();


//     const fetchBooks = () => {
//         const url = new URL("http://localhost:8000/books/get/library");
//         console.log(url);
  
//         fetch(url)
//         .then((resp) => {
//           return(resp.json());
//         })
//         .then((obj) => {
//           console.log(obj);
//           if(obj.length === 0)
//             setDisplay(<h3 style = {{fontFamily:"Consolas"}}>Your Library is empty! Head over to <a href = "/search">the search tab</a> to add books!</h3>)
//         else
//         {
//         //   if(obj.items === undefined || obj.totalItems === 0)
//         //     return(<h3 style = {{fontFamily:"Consolas"}}>No books were found!</h3>);
//         //   else
//         //   {
//         //     const items = obj.items;
//         //     console.log(obj)
  
//             // items.forEach((book) => {
//             //   console.log(book.volumeInfo.imageLinks);
//             // });
            
//             // return(<h3>{JSON.stringify(items)}</h3>)
//             // setDisplay(<div style = {{display: "flex", flexWrap: "wrap", textAlign: "center"}}>
//             //   {items.map((b) => (
//             //     <BookDisplay book = {b} key = {b.etag}/>
//             //   ))}
//             // </div>);
//           //   items.forEach((book) => {
//           //     setDisplay(<BookDisplay book = {book}/>);
//           //     alert("check");
//           // });    
  
//         //   }
//         setDisplay(<div style = {{display: "flex", flexWrap: "wrap", textAlign: "center"}}>
//             {obj.map((b) => (
//             // <cardMaker book = {b} key = {b.id}/>
//                 // cardMaker(b)
//                 <LibraryDisplay book = {b} key = {b.id}/>
//             ))}
//         </div>);
//         }
//     })
// }

// const [display, setDisplay] = useState(<Button className = {classes.button} onClick = {fetchBooks}>Click here to update your library!</Button>);   



// // const removeBook = (book) => {
// //     console.log("in here")
// //     const t = book.title;
// //     const i = book.id
// //     console.log(t);
// //     console.log(i);
//     // axios
//     //     .delete("http://localhost:8000/books/remove", {
//     //         "id": i,
//     //         "title": t, 
//     //     })
//     //     .catch(err => {
//     //         console.log(err)
//     //         // document.getElementById("adder").value = "Already in Library"
//     //         alert("This book is not in your library!")
//     //     })
// // }


//     //   const cardMaker = (book) => {
//     //     const thumbnail = <img src = {book.picture} alt = "No thumbnail found"/>;
//     //     const title = <Typography gutterBottom variant="h5" component="h2">{book.title}</Typography>;
//     //     const author = <Typography component = "h3">{book.author}</Typography>;
//     //     const summary = <Typography variant="body2" color="textSecondary" component="p">{book.summary}</Typography>;

//     //     return(
//     //         <Card className={classes.root} variant="outlined">
//     //             <CardActionArea>
//     //                 <div className = {classes.div}>
//     //                     {thumbnail}
//     //                 </div>
//     //                 <CardContent>
//     //                     {title}
//     //                     {author}
//     //                     {summary}
//     //                     {/* <Typography variant="body2" color="textSecondary" component="p">
//     //                         {book.searchInfo.textSnippet}
//     //                     </Typography> */}
//     //                 </CardContent>
//     //             </CardActionArea>
//     //             <CardActions>
//     //                 <div style = {{textAlign: "center", }}>
//     //                     <Button id = "remover" className = {classes.button} size="small" color="primary" onClick = {removeBook}>
//     //                         Remove from Library
//     //                     </Button>
//     //                     <Button className = {classes.button} size="small" color="primary" href = {book.info}>
//     //                         Learn More
//     //                     </Button>
//     //                 </div>
//     //             </CardActions>
//     //         </Card>
//     //     )
            
//     // } //ends cardMaker 


//     return(
//         <div
//             style = {{
//             //     display: "inline",
//             //     width: 100,
//             //     flexDirection: "row",
//             //     alignItems: "top",
//                 textAlign: "center",
//             //     margin: "auto",
//             //     borderBottom: "thin solid black",
//             //     // padding: "5px",
//             //     backgroundColor: "lightgray"
        
//             }}
//         >
//             <Header/>
//             {/* {fetchBooks()} */}
//             <div className={classes.div}>
//                 {display}
//             </div>
//             {/* <h1>Welcome to Mihir's React Apps!</h1>
//             <h2>Please select a page from above</h2> */}
//         </div>
//     )
// }