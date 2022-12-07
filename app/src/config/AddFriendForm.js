import {db} from './db';
import {useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';


export function AddFriendForm({defaultAge} = {defaultAge: 21}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState(defaultAge);
    const [status, setStatus] = useState("");
  
    async function addFriend() {
      try {
  
        // Add the new friend!
        const id = await db.friends.add({
          name,
          age
        });
  
        setStatus(`Friend ${name} successfully added. Got id ${id}`);
        setName("");
        setAge(defaultAge);
      } catch (error) {
        setStatus(`Failed to add ${name}: ${error}`);
      }
    }
  
    return <>

    </>
  }



export function FriendList({minAge, maxAge}) {
  const friends = useLiveQuery(
    async () => {
      //
      // Query Dexie's API
      //
      const friends = await db.friends
        .where('age')
        .between(minAge, maxAge)
        .toArray();

      // Return result
      return friends;
    },
    // specify vars that affect query:
    [minAge, maxAge] 
  );

  return <ul>
    {friends?.map(friend => <li key={friend.id}>
      {friend.name}, {friend.age}
    </li>)}
  </ul>;
}

