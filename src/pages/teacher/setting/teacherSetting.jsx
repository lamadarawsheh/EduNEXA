import { FormProvider, useForm } from "react-hook-form";
import AccountSettings from "./accountSetting";
import SocialSettings from "./socialSetting";



export default function TeacherSettings() {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      title: "",
      bio: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      whatsapp: "",
      youtube: "",
    },
  });
 

  return (
    <FormProvider {...methods}>
    <div className="container p-10">
         <AccountSettings />
         <SocialSettings/>
    </div>
    </FormProvider>
  );
}
