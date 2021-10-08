import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import SettingsPage from "..";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/client";
import { Switch } from "@headlessui/react";
import Select from "react-select";
import { fileUpload } from "@/helpers/ImageUpload";
import { getUserByID, updateUserByID } from "@/lib/userAPI";
import { Session } from "next-auth";
import useUserContext from "@/hooks/useUserContext";
import useToastContext from "@/hooks/useToastContext";
import { IUser } from "@/interfaces/user.interface";

const SettingsProfilePage: React.FC = () => {
  const [session, loading] = useSession();
  const [urlPhoto, setUrlPhoto] = useState("");
  const {
    state: {
      id,
      full_name,
      about_me,
      email,
      skills,
      url_photo,
      isActive,
      links,
    },
    dispatch,
  } = useUserContext();
  const { addToast } = useToastContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
  } = useForm<IUser>({
    defaultValues: {
      url_photo: "",
    },
  });

  useEffect(() => {
    const getUserData = async (session: Session) =>
      await getUserByID(session.user.id.toString());
    if (!id && !loading && session) {
      getUserData(session).then((res) => {
        if (res.code !== 404 && res.code !== 400) {
          const {
            data: {
              full_name,
              about_me,
              email,
              skills,
              url_photo,
              isActive,
              links,
            },
          } = res;

          reset({
            full_name,
            about_me,
            email,
            skills,
            url_photo,
            isActive,
            links,
          });
          dispatch({ type: "SET", payload: { ...res.data } });
        } else {
          addToast({
            title: "Error",
            subText: "Hubo un problema al cargar los datos",
            type: "error",
          });
        }
      });
    }
    if (id && !loading) {
      reset({
        full_name,
        about_me,
        email,
        skills,
        url_photo,
        isActive,
        links,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const options = [
    { value: "Diseño UX-UI", label: "Diseño UX-UI" },
    { value: "Backend", label: "Backend" },
    { value: "Product management", label: "Product management" },
    { value: "Inglés", label: "Inglés" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    { value: "Analítica web / App", label: "Analítica web / App" },
    { value: "Frontend", label: "Frontend" },
    { value: "Git", label: "Git" },
    {
      value: "Data science / Data engineer",
      label: "Data science / Data engineer",
    },
    {
      value: "Diseño y arquitectura de software",
      label: "Diseño y arquitectura de software",
    },
    { value: "Soft skills", label: "Soft skills" },
    { value: "Orientación / CV", label: "Orientación / CV" },
    { value: "Intro a la programación", label: "Intro a la programación" },
  ];

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const res = await updateUserByID(id, data);
    if (res === 400 || res === 404) {
      addToast({
        title: "Hubo un problema",
        subText: "El usuario no ha sido actualizado",
        type: "error",
      });
    } else {
      addToast({
        title: "Actualizado",
        subText: "El usuario se ha actualizado correctamente",
        type: "default",
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = await fileUpload(file);
      if (imageUrl) {
        setUrlPhoto(imageUrl);
        setValue("url_photo", imageUrl);
      }
    }
  };

  return (
    <SettingsPage
      title="Perfil"
      description="Esta información será publicada en la página de FrontendCafé."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="divide-y divide-dividerColor lg:col-span-9"
      >
        <div className="px-4 py-6 sm:p-6 lg:pb-8">
          <div className="flex flex-col mt-6 lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Completo
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="full_name"
                    autoComplete="off"
                    className="flex-grow block w-full min-w-0 border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    {...register("full_name", { required: true })}
                  />
                </div>
                {errors.full_name && (
                  <p className="pl-1 text-xs text-red-600">
                    El nombre es requerido
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sobre mí
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    rows={3}
                    autoComplete="off"
                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    {...register("about_me", { required: true })}
                  />
                </div>
                {errors.about_me && (
                  <p className="pl-1 text-xs text-red-600">
                    El campo &quot;Sobre mí&quot; es requerido
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Esto se va a visualizar en la web de FrontendCafé
                </p>
              </div>
            </div>

            <div className="flex-grow mt-6 lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              <p
                className="text-sm font-medium text-gray-700"
                aria-hidden="true"
              >
                Foto
              </p>

              <div className="relative overflow-hidden rounded-full">
                <Image
                  className="relative w-40 h-40 rounded-full"
                  src={
                    urlPhoto
                      ? urlPhoto
                      : getValues("url_photo") !== ""
                      ? (getValues("url_photo") as string)
                      : "https://res.cloudinary.com/frontendcafe/image/upload/v1631388475/defaultUserImage_advu4k.svg"
                  }
                  alt="User profile image"
                  width="180px"
                  height="180px"
                />
                <label
                  htmlFor="url_photo"
                  className="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus-within:opacity-100"
                >
                  <span>Cambiar</span>
                  <span className="sr-only"> foto del usuario</span>
                  <input
                    type="file"
                    id="url_photo"
                    className="absolute inset-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Mail
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="pl-1 text-xs text-red-600">
                  El campo mail es requerido
                </p>
              )}
            </div>
            {/* Social networks */}
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                autoComplete="off"
                placeholder="https://www.linkedin.com/in/usuario/"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                {...register("links.linkedin", { required: true })}
              />
              {errors.links?.linkedin && (
                <p className="pl-1 text-xs text-red-600">
                  El campo es requerido
                </p>
              )}
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700"
              >
                Github
              </label>
              <input
                type="url"
                id="github"
                autoComplete="off"
                placeholder="https://github.com/usuario"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                {...register("links.github", { required: false })}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="portfolio"
                className="block text-sm font-medium text-gray-700"
              >
                Portafolio
              </label>
              <input
                type="url"
                id="portfolio"
                autoComplete="off"
                placeholder="https://portfolio.com"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                {...register("links.portfolio", { required: false })}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                autoComplete="off"
                placeholder="https://twitter.com/usuario"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                {...register("links.twitter", { required: false })}
              />
            </div>
            {/* Skills */}
            <div className="col-span-12">
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <Controller
                control={control}
                name="skills"
                // defaultValue={options.map((c) => c.value)}
                render={({ field: { onChange, ref, value } }) => (
                  <Select
                    value={options.filter((c) => value?.includes(c.value))}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    inputRef={ref}
                    options={options}
                    isMulti
                  />
                )}
                rules={{ required: true }}
              />
              {errors.skills && (
                <p className="pl-1 text-xs text-red-600">
                  El campo es requerido
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Others */}
        <div className="divide-y divide-gray-200">
          <div className="px-4 sm:px-6">
            <ul role="list" className="mt-2 divide-y divide-dividerColor">
              <Switch.Group
                as="li"
                className="flex items-center justify-between py-4"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Activo
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    Aparecer en la web de FrontendCafé como disponible o no para
                    dar mentorías.
                  </Switch.Description>
                </div>
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field: { value, onChange } }) => (
                    <Switch
                      checked={value as boolean}
                      onChange={onChange}
                      className={`${
                        value ? "bg-teal-500" : "bg-gray-200"
                      } ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${
                          value ? "translate-x-5" : "translate-x-0"
                        } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </Switch>
                  )}
                />
              </Switch.Group>
            </ul>
          </div>
        </div>

        <div className="pt-6 divide-y divide-dividerColor">
          <div className="flex justify-end px-4 py-4 mt-4 sm:px-6">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-5 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-fecGreen hover:bg-sky-800 focus:outline-none"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SettingsPage>
  );
};

export default SettingsProfilePage;
