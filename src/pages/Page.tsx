import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGeneralSettings } from "../stores/general-settings-store";
import PageHeader from "../modules/PageHeader";
import Spinner from "../components/Spinner";


interface Props {
   callout?: string
   description?: string
   backIcon?: React.ElementType
   disableNav?: boolean
   children?: React.ReactNode
   className?: string
   backRoute?: string
   showSettings?: boolean
   isLoading?: boolean
   isError?: boolean
   errorMessage?: string
}


const Page = (
   { 
      callout = "Page Title", 
      description = "Page description", 
      backIcon,
      disableNav,  
      children,
      className,
      backRoute,
      showSettings = true,
      isLoading,
      isError,
      errorMessage
   }: Props
) => 
{
   const is_dark_theme = useGeneralSettings(store => store.is_dark_theme)
   const setIsDarkTheme = useGeneralSettings(store => store.setDarkTheme)

   const location = useLocation();
   const navigate = useNavigate();


   /**
    * if no preference is recorded, use the browser's default theme
    * 
    * NOTE: this should only run on page first load
    */
   useEffect(() => 
   {
      if (is_dark_theme !== undefined) return

      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkTheme(isDark)
   })


   /**
    * set the theme according to the preference
    */
   useEffect(() =>
   {
      if (is_dark_theme)
      {
         document.documentElement.classList.remove("light")
         document.documentElement.classList.add("dark")
      }
      else
      {
         document.documentElement.classList.remove("dark")
         document.documentElement.classList.add("light")
      }
   }, [is_dark_theme])


   /**
    * toggle the side theme between dark-light
    */
   const toggleTheme = useCallback(() =>
   {
      setIsDarkTheme(!is_dark_theme)

   }, [is_dark_theme, setIsDarkTheme])


   /**
    * handles the back button nav request
    */
   const handleBack = useCallback(() => 
   {
      if (backRoute) 
      {
         navigate(backRoute, { replace: true });
         return;
      }

      if (location.state?.from) 
      {
         navigate(location.state.from, { replace: true });
         return;
      }

      navigate(-1);

   }, [backRoute, location.state?.from, navigate])


   /**
    * handles the settings button nav request
    */
   const navigate2Settings = useCallback(() =>
   {
      navigate("/settings", {
         state: { from: location }
      });
   }, [location, navigate])



   return (
      <div className="flex flex-col w-full h-full items-center text-text">
         <PageHeader
            title={callout}
            description={description}
            isDarkTheme={is_dark_theme}
            disableNav={disableNav}
            backIcon={backIcon}
            showSettings={showSettings}
            onBackNav={handleBack}
            onToggleTheme={toggleTheme}
            onSettingsNav={navigate2Settings}
         />

         <div className={`flex w-full h-full p-4 md:w-4/5 md:px-0 md:py-8 ${className}`}>
         {
            isError 
            ? <div className="flex items-center justify-center w-full h-full text-2xl text-textprimary">{errorMessage}</div>
            
            : isLoading 
            ? <Spinner />
            : children
         }
         </div>
      </div>
   );
}


export default Page