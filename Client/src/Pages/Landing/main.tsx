/**
 * @returns Render the landing page
 */
export const MainPage = () => {
 
  return (
    <>
      {
        <div className="mt-[50px] justify-content-center" >
          <p className="text-3xl font-black text-center" >{import.meta.env.VITE_APP_NAME}</p>
        </div>
      }
    </>
  )
};
