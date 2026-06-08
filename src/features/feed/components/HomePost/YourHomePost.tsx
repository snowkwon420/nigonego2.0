import MyHomePost from './MyHomePost';

interface YourHomePostProps {
  accountName: string;
}

export default function YourHomePost({ accountName }: YourHomePostProps) {
  console.log(accountName);
  return <MyHomePost accountName={accountName} />;
}
