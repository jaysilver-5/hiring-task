
import HashLoader from 'react-spinners/HashLoader';

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <HashLoader
        color={'#00b8b9'}
        loading={true}

        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default LoadingModal