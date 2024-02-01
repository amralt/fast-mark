import html2canvas from "html2canvas"



export default function CreateScrinshot() {
    function onCreate() {
        console.log("asdfadf")
        html2canvas(document.querySelector("#root")).then(canvas => {
            document.body.appendChild(canvas)
          });
    }
    return (
        <>
            <h1>Create scrinshot</h1>
            <button onClick={onCreate}>create</button>
        </>
    )
}