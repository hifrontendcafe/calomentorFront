import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  HOME,
  MENTORS,
  PROFILE,
  WARNINGS,
  ADMIN_HISTORY,
  SELF_HISTORY,
} from '@/config/Routes';

const pageNames: Record<string, string> = {
  [HOME]: 'Inicio',
  [PROFILE]: 'Perfil',
  [MENTORS]: 'Mentors',
  [WARNINGS]: 'Penalizaciones',
  [ADMIN_HISTORY]: 'Mentorías',
};

export function useNavTitle() {
  const {
    route,
    query: { name },
  } = useRouter();
  const [title, setTitle] = useState<string>('Inicio');

  useEffect(() => {
    if (route) {
      if (route === SELF_HISTORY) {
        setTitle(String(name));
      } else {
        setTitle(pageNames[route]);
      }
    }
  }, [route, name]);

  return [title];
}
