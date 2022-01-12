export default function DeleteTestPage() {
   localStorage.removeItem("token");
   return(
      <div>
         <h1> Deleted token </h1>
      </div>
   )
}