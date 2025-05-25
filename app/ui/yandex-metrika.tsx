import { YMInitializer } from 'react-yandex-metrika';

export default function YandexMetrika() {
  return (
    <div>
        <YMInitializer accounts={[102157439]} />
    </div>
  );
}