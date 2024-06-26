import './ErrorPageWrap.css';

type TProps = {
  errorCode?: number;
  errorText?: string;
};

export const ErrorPageWrap = (props: TProps) => {
  const { errorCode, errorText } = props;

  return (
    <div className='error-page'>
      <div className='error-page__wrap'>
        <h1>Oops!</h1>
        <p className='error-page__descr'>
          Sorry, an unexpected error has occurred.
        </p>
        {errorCode && <h2 className='error-page__code'>{errorCode}</h2>}
        {errorText && <h3 className='error-page__text'>{errorText}</h3>}
      </div>
    </div>
  );
};
