import { Formik } from "formik";

import InputField from "./InputField";

// header:{salutation, title}
// initialValues, validationSchema, onSubmit,
// inputFields: [{name, label, type, placeholder}]
// extraComponents: () => { return <component(s)[array] to be rendered> }
// submitData: {name, value}

const formDefaultBackgroundColor = "bg-[#120F05]"

export default function FormCard(props) {

   // element
   /*
   {
      name, label, type, placeHolder
   }*/

   let {header, initialValues, validationSchema, onSubmit, inputFields, extraComponents, submitData, background, rememberMe} = props;

   return (
   <div className={`p-10 flex justify-center items-center ${background ? background : formDefaultBackgroundColor}`}>
      <div className="w-full mx-5 md:w-auto flex flex-col gap-10 md:mx-10 my-auto">
          <div className="w-full flex flex-col justify-center items-start md:justify-items-start" >
              <p className="flex-1 text-white text-sm font-roboto font-medium"> {header.salutation} </p>
              <p className="flex-1 text-white text-5xl font-roboto font-bold "> {header.title} </p>
          </div>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
          > 
          {
              ({values, handleChange, handleSubmit}) =>
              (
                  <form 
                      noValidate
                      autoComplete="on"
                      onSubmit={handleSubmit}
                      className="w-full flex flex-col justify-center items-center gap-8">
                      <div className="w-full flex flex-col gap-5">
                          {
                             inputFields.map((element) => {
                                return (
                                   <InputField
                                     autoComplete="on" 
                                     label={element.label}
                                     name={element.name}
                                     type={element.type}
                                     onChange={handleChange}
                                     placeholder={element.placeholder}
                                   />
                                )
                             })
                          }
                      </div>


                      { rememberMe && (/* remember me, forgot password */
                      <div className="flex w-full justify-start">
                        <div className="flex flex-row justify-start gap-2">
                          <input 
                              name="rememberMe" 
                              type="checkbox"
                              className="h-full justify-start bg-black rounded-full"  />
                              <label className="text-white font-roboto text-md"> Remember me </label>
                        </div>
                      </div>
                      )}

                      <div className="w-full flex flex-col md:flex-row gap-3 items-center">
                          <button 
                           name={submitData.name}
                           type="submit"   
                        //    bg-[#5264B5]
                           className="w-full h-12 justify-center rounded-lg text-white bg-contest-card-hover hover:bg-white hover:text-gray-700 transition duration-300 ease-in-out" > {submitData.value} </button>
                           {extraComponents()}
                          {/* <button name="signup" onClick={navigateSignup} className="w-8/12 h-10 justify-center rounded-lg bg-transparent text-white hover:text-white hover:border-white hover:border-2 transition-all duration-300 ease-in-out" > Signup</button> */}
                      </div>
                  </form>
              )
          }
          </Formik >
         
      </div>
          
   </div>
   )
}