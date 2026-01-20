import { useForm } from "react-hook-form";

export default function AccountSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
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

  const titleValue = watch("title", "");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container">
      <h2>Account Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        {/* Name */}
        <div className="row">
          <input {...register("firstName")} placeholder="First name" />
          <input {...register("lastName")} placeholder="Last name" />
        </div>

        {/* Username */}
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Enter your username"
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        {/* Phone */}
        <input {...register("phone")} placeholder="+880 Your phone number" />

        {/* Title */}
        <div className="field">
          <input
            {...register("title", { maxLength: 50 })}
            placeholder="Your title, profession or small biography"
          />
          <small>{titleValue.length}/50</small>
        </div>

        {/* Bio */}
        <textarea
          {...register("bio")}
          placeholder="Your title, profession or small biography"
        />

        <button type="submit">Save Changes</button>
      </form>

      <h2>Social Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <input {...register("website")} placeholder="Personal website or portfolio url" />

        <div className="row">
          <input {...register("facebook")} placeholder="Facebook username" />
          <input {...register("instagram")} placeholder="Instagram username" />
          <input {...register("linkedin")} placeholder="LinkedIn username" />
        </div>

        <div className="row">
          <input {...register("twitter")} placeholder="Twitter username" />
          <input {...register("whatsapp")} placeholder="Whatsapp number" />
          <input {...register("youtube")} placeholder="Youtube username" />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
