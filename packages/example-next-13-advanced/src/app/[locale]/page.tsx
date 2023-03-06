import {
  Link,
  useFormatter,
  useNow,
  useTimeZone,
  useTranslations
} from 'next-intl';
import Image from 'next/image';
import ClientRouterWithoutProvider from '../../components/ClientRouterWithoutProvider';
import CoreLibrary from '../../components/CoreLibrary';
import LocaleSwitcher from '../../components/LocaleSwitcher';
import PageLayout from '../../components/PageLayout';
import MessagesAsPropsCounter from '../../components/client/01-MessagesAsPropsCounter';
import MessagesOnClientCounter from '../../components/client/02-MessagesOnClientCounter';

type Props = {
  searchParams: Record<string, string>;
};

export default function Index({searchParams}: Props) {
  const t = useTranslations('Index');
  const format = useFormatter();
  const now = useNow();
  const timeZone = useTimeZone();

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <p data-testid="RichText">
        {t.rich('rich', {important: (chunks) => <b>{chunks}</b>})}
      </p>
      <p
        dangerouslySetInnerHTML={{__html: t.raw('rich')}}
        data-testid="RawText"
      />
      <p data-testid="GlobalDefaults">{t.rich('globalDefaults')}</p>
      {/* @ts-expect-error Purposefully trigger an error */}
      <p data-testid="MissingMessage">{t('missing')}</p>
      <p data-testid="CurrentTime">
        {format.dateTime(now, 'medium')} ({timeZone || 'N/A'})
      </p>
      <p data-testid="CurrentTimeRelative">{format.relativeTime(now)}</p>
      <p data-testid="Number">
        {format.number(23102, {style: 'currency', currency: 'EUR'})}
      </p>
      <LocaleSwitcher />
      <MessagesAsPropsCounter />
      {/* @ts-expect-error RSC are not supported yet by TypeScript */}
      <MessagesOnClientCounter />
      <CoreLibrary />
      <ClientRouterWithoutProvider />
      <div>
        <Link href={{pathname: '/', query: {test: true}}}>
          Go to home with query param
        </Link>
      </div>
      <p data-testid="SearchParams">{JSON.stringify(searchParams, null, 2)}</p>
      <Image alt="" height={77} priority src="/assets/image.jpg" width={128} />
    </PageLayout>
  );
}
