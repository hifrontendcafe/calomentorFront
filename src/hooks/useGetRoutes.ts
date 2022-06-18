import { primaryRoutes, SELF_HISTORY } from '@/config/Routes';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { isMentor } from '@/helpers/hasRole';
import { FingerPrintIcon } from '@heroicons/react/outline';

export function useGetRoutes() {
  const [session] = useNextAuthSession();
  const routes =
    isMentor(session?.user?.role!) &&
    !primaryRoutes.find(route => route.name === 'Mi historial')
      ? primaryRoutes.splice(1, 0, {
          name: 'Mi historial',
          icon: FingerPrintIcon,
          href: `${SELF_HISTORY}?name=${session?.user?.name}&userId=${session?.user?.id}&isMentor=true`,
        })
      : primaryRoutes;

  return routes;
}
