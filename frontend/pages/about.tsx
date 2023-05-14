import Link from 'next/link';

export default function About() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About Legit</h1>
      <p>
        Created by Angélica, Caroline and Daria during ETHGlobal Lisbon 2023
      </p>
      <Link href="/">Home</Link>
    </div>
  );
}
