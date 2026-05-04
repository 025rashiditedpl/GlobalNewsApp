import { styles } from '@/style/mystyle';
import { useEffect, useState } from 'react';
import {
    Modal,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
   visible: boolean;
   editItem?: string | null;
   placeholder?:string | null
   onClose: () => void;
   onUpdate:(value:string | null,key:string | null)=>void;
};

export default function ProfileModal({ visible,editItem, placeholder, onClose, onUpdate}: Props) {
  const [editValue, setEditValue] = useState('');
  const [placeholdervalue,setPlaceHolder]=useState('')
   

     useEffect(() => {
    if (editItem) {
       setEditValue(editItem)
       setPlaceHolder(placeholder??'')
    } else {
      setEditValue('')
      setPlaceHolder('')
    }
  }, [editItem,placeholder, visible]);

  const handleUpdate = () => {
  onUpdate(editValue,placeholdervalue);
  setEditValue('') 
  setPlaceHolder('')
  onClose();
};

  const handleClose = () => {
    setEditValue('')
    setPlaceHolder('')
    onClose();
  };

   return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>

          <Text style={styles.title}>Profile Update</Text>

          <TextInput
            placeholder={placeholdervalue}
            style={styles.modalinput}
            value={editValue}
            onChangeText={setEditValue}
          />
         

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
               handleUpdate()
            }}
            
            >
             
              <Text>Update</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );


}