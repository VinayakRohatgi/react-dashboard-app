import useInferenceData from '../hooks/useInferenceData';

export default function Upload() {
  const data = useInferenceData();
  console.log(data);
  
  return <h1>Upload Video Page</h1>;
}