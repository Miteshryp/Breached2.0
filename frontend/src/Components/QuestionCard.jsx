export default function QuestionCard(props) {
    let {question} = props;

    return (
        <div className="w-full h-fit lg:h-full p-20  rounded-2xl bg-card">
            <div className="h-[90%] p-4 my-10 lg:my-0 flex flex-col lg:flex-row justify-start lg:justify-center gap-10 lg:gap-5">
                <div className="w-full lg:w-7/12 h-auto flex flex-col gap-4 lg:justify-start">
                    <h1 className="text-white text-4xl font-medium font-roboto">Sample 1</h1>

                    <div className="w-full h-fit lg:h-[80%] lg:overflow-y-auto scrollbar-none">
                        <p className="text-white text-xl md:text-lg font-light font-roboto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, massa ac rutrum imperdiet, nisi nibh bibendum sem, nec condimentum velit tortor id nunc. Nunc a erat eget felis viverra rutrum nec sed ligula. Vestibulum commodo massa sed magna malesuada mollis. Sed imperdiet nunc quam, a congue nibh finibus vel. Donec ac neque faucibus, convallis velit quis, accumsan quam. Nullam nec nisi erat. Aliquam in congue risus, non mollis tortor. Donec tincidunt mattis neque vitae mollis. Proin scelerisque, nibh non ullamcorper bibendum, erat arcu blandit ipsum, ac malesuada tellus nibh sit amet ipsum. Cras nec metus vehicula, porta mi sed, maximus diam. Vivamus vitae tellus lorem. Aliquam erat volutpat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, massa ac rutrum imperdiet, nisi nibh bibendum sem, nec condimentum velit tortor id nunc. Nunc a erat eget felis viverra rutrum nec sed ligula. Vestibulum commodo massa sed magna malesuada mollis. Sed imperdiet nunc quam, a congue nibh finibus vel. Donec ac neque faucibus, convallis velit quis, accumsan quam. Nullam nec nisi erat. Aliquam in congue risus, non mollis tortor. Donec tincidunt mattis neque vitae mollis. Proin scelerisque, nibh non ullamcorper bibendum, erat arcu blandit ipsum, ac malesuada tellus nibh sit amet ipsum. Cras nec metus vehicula, porta mi sed, maximus diam. Vivamus vitae tellus lorem. Aliquam erat volutpat.
                        </p>
                    </div>
                    

                </div>

                <div className="h-full w-full lg:w-5/12 flex flex-col justify-center items-center">
                    <div className="h-fit w-fit flex flex-col mx-auto justify-center items-center">
                        <img src="loading.gif"></img>
                    </div>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start">
                <form className="h-fit flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start">
                    <input className="w-full lg:w-80 h-14  lg:h-14 p-2 mx-6 lg:my-0 rounded text-center text-3xl font-inter font-bold" type="text" />
                    <input className="w-full lg:w-40 h-full        p-4 my-4 lg:my-0 rounded text-center text-md font-roboto font-medium bg-sky-400  transition-all ease-in-out hover:scale-110 hover:text-white " type="button" value="Submit" />
                    
                </form>
            </div>
        </div>
    )
}