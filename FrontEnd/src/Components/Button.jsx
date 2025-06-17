export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-secondary text-2xl text-white font-bold py-1 px-2 rounded mr-8"
      onClick={onClick}>
      {text}
    </button>
  );
}
