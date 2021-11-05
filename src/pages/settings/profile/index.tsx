import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SettingsPage from '..';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/client';
import Select from 'react-select';
import { fileUpload } from '@/helpers/ImageUpload';
import useUserContext from '@/hooks/useUserContext';
import useToastContext from '@/hooks/useToastContext';
import { IUser } from '@/interfaces/user.interface';
import { axiosPut } from '@/lib/api';
import { USER } from '@/config/Routes';
import CustomButton from '@/components/CustomButton';
import TimezoneList from '@/lib/timezones.json';
import { getUserData } from '@/services';

const SettingsProfilePage: React.FC = () => {
  const [session, loading] = useSession();
  const [urlPhoto, setUrlPhoto] = useState(
    'https://res.cloudinary.com/frontendcafe/image/upload/v1631388475/defaultUserImage_advu4k.svg',
  );
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
      timezone,
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
  } = useForm<IUser>({
    defaultValues: {
      url_photo: '',
    },
  });

  useEffect(() => {
    if (!id && !loading && session) {
      getUserData(session.user.id.toString()).then(({ data }) => {
        if (data.full_name) {
          const {
            full_name,
            about_me,
            email,
            skills,
            url_photo,
            isActive,
            links,
            timezone,
          } = data;
          reset({
            full_name,
            about_me,
            email,
            skills,
            url_photo,
            isActive,
            links,
            timezone: timezone?.toString(),
          });
          setUrlPhoto(url_photo ?? '');
          dispatch({ type: 'SET', payload: { ...data } });
        }
      });
    }
    if (id && !loading) {
      const timezoneString = timezone ? timezone.toString() : '';
      reset({
        full_name,
        about_me,
        email,
        skills,
        url_photo,
        isActive,
        links,
        timezone: timezoneString,
      });
      if (url_photo && url_photo !== '') {
        setUrlPhoto(url_photo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const options = [
    { value: 'Diseño UX-UI', label: 'Diseño UX-UI' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Product management', label: 'Product management' },
    { value: 'Inglés', label: 'Inglés' },
    { value: 'Entrepreneurship', label: 'Entrepreneurship' },
    { value: 'Analítica web / App', label: 'Analítica web / App' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Git', label: 'Git' },
    {
      value: 'Data science / Data engineer',
      label: 'Data science / Data engineer',
    },
    {
      value: 'Diseño y arquitectura de software',
      label: 'Diseño y arquitectura de software',
    },
    { value: 'Soft skills', label: 'Soft skills' },
    { value: 'Orientación / CV', label: 'Orientación / CV' },
    { value: 'Intro a la programación', label: 'Intro a la programación' },
  ];

  const onSubmit: SubmitHandler<IUser> = async data => {
    axiosPut(USER, { data })
      .then(({ data }) => {
        console.log(data);
        addToast({
          title: 'Actualizado',
          subText: 'El usuario se ha actualizado correctamente',
          type: 'default',
        });
      })
      .catch(err => {
        console.log(err);
        addToast({
          title: 'Hubo un problema',
          subText: 'El usuario no ha sido actualizado',
          type: 'error',
        });
      });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.startsWith('image')) {
        addToast({
          title: 'Debe subir una imagen',
          subText: '',
          type: 'error',
        });
        return;
      }

      const imageUrl = await fileUpload(file);
      if (imageUrl) {
        setUrlPhoto(imageUrl);
        setValue('url_photo', imageUrl);
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
          <div style={{ display: 'none' }}>
            <input
              type="text"
              id="id"
              autoComplete="off"
              defaultValue={session?.user?.id?.toString()}
              {...register('id', { required: true })}
            />
          </div>
          <div className="flex flex-col mt-6 lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium label"
                >
                  Nombre Completo*
                </label>
                <div className="flex mt-1 rounded-md">
                  <input
                    type="text"
                    id="full_name"
                    autoComplete="off"
                    className="custom_input"
                    {...register('full_name', { required: true })}
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
                  className="block text-sm font-medium label"
                >
                  Sobre mí*
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    rows={3}
                    autoComplete="off"
                    className="custom_input"
                    {...register('about_me', {
                      required: true,
                      maxLength: 450,
                    })}
                  />
                </div>
                {errors.about_me && (
                  <p className="pl-1 text-xs text-red-600">
                    El campo &quot;Sobre mí&quot; es requerido
                  </p>
                )}
              </div>
            </div>

            <div className="flex-grow mt-6 lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              <p className="text-sm font-medium label" aria-hidden="true">
                Foto
              </p>

              <div className="relative overflow-hidden rounded-full">
                <Image
                  className="relative rounded-full"
                  src={urlPhoto}
                  alt="User profile image"
                  width="180px"
                  height="180px"
                />
                <label
                  htmlFor="url_photo"
                  className="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-opacity-75 opacity-0 bg-cardContent hover:opacity-100 focus-within:opacity-100"
                >
                  <span>Cambiar</span>
                  <span className="sr-only"> foto del usuario</span>
                  <input
                    type="file"
                    accept="image/*"
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
                className="block text-sm font-medium label"
              >
                Mail*
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                className="custom_input"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="pl-1 text-xs text-red-600">
                  El campo mail es requerido
                </p>
              )}
            </div>
            {/* Skills */}
            <div className="col-span-12">
              <label
                htmlFor="skills"
                className="block text-sm font-medium label"
              >
                Skills*
              </label>
              <Controller
                control={control}
                name="skills"
                render={({ field: { onChange, ref, value } }) => (
                  <Select
                    instanceId="superUniqueID"
                    value={options.filter(c => value?.includes(c.value))}
                    onChange={val => onChange(val.map(c => c.value))}
                    inputRef={ref}
                    options={options}
                    isMulti
                    classNamePrefix="react-select"
                    className="filter-selector"
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
            {/* Timezone */}
            <div className="col-span-12">
              <label
                htmlFor="skills"
                className="block text-sm font-medium label"
              >
                Zona Horaria*
              </label>
              <Controller
                control={control}
                name="timezone"
                render={({ field: { onChange, ref, value } }) => (
                  <Select
                    placeholder="Seleccionar"
                    instanceId="superUniqueID2"
                    value={TimezoneList.filter(
                      c => value?.toString() === c?.id?.toString(),
                    )}
                    onChange={c => onChange(c?.id?.toString())}
                    inputRef={ref}
                    options={TimezoneList}
                    getOptionLabel={opt => opt.text}
                    getOptionValue={opt => opt.id.toString()}
                    classNamePrefix="react-select"
                    className="filter-selector"
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
            {/* Social networks */}
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium label"
              >
                LinkedIn*
              </label>
              <input
                type="url"
                id="linkedin"
                autoComplete="off"
                className="custom_input"
                placeholder="https://www.linkedin.com/in/usuario/"
                {...register('links.linkedin', { required: true })}
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
                className="block text-sm font-medium label"
              >
                Github
              </label>
              <input
                type="url"
                id="github"
                autoComplete="off"
                className="custom_input"
                placeholder="https://github.com/usuario"
                {...register('links.github', { required: false })}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="portfolio"
                className="block text-sm font-medium label"
              >
                Portafolio
              </label>
              <input
                type="url"
                id="portfolio"
                autoComplete="off"
                className="custom_input"
                placeholder="https://portfolio.com"
                {...register('links.portfolio', { required: false })}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="twitter"
                className="block text-sm font-medium label"
              >
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                autoComplete="off"
                className="custom_input"
                placeholder="https://twitter.com/usuario"
                {...register('links.twitter', { required: false })}
              />
            </div>
          </div>
        </div>
        {/* Others */}
        {/* <div className="divide-y divide-gray-200">
          <div className="px-4 sm:px-6">
            <ul role="list" className="mt-2 divide-y divide-dividerColor">
              <Switch.Group
                as="li"
                className="flex items-center justify-between py-4"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium label"
                    passive
                  >
                    Activo
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-300">
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
                        value ? 'bg-teal-500' : 'bg-gray-200'
                      } ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${
                          value ? 'translate-x-5' : 'translate-x-0'
                        } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </Switch>
                  )}
                />
              </Switch.Group>
            </ul>
          </div>
        </div> */}

        <div className="pt-6 divide-y divide-dividerColor">
          <div className="flex justify-end px-4 py-4 mt-4 sm:px-6">
            <CustomButton
              bntLabel="Cancelar"
              primary={false}
              clickAction={() => reset()}
              className="mr-2"
            />
            <CustomButton type="submit" bntLabel="Guardar" primary />
          </div>
        </div>
      </form>
    </SettingsPage>
  );
};

export default SettingsProfilePage;
