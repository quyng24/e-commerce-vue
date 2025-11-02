import type { UserType } from '@/type/type'
import { db } from '@/utility/firebaseConfig'
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const productCollection = collection(db, 'products')

export default {
  async createProduct(productData: object) {
    try {
      const docRef = await addDoc(productCollection, productData)
      return { id: docRef.id, ...productData }
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  },
  async getProducts() {
    const snaphost = await getDocs(productCollection)
    return snaphost.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as UserType)
  },
  async getProductById(id: string) {
    const docRef = doc(db, 'products', id)
    try {
      const snapshot = await getDoc(docRef)
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as UserType
      } else {
        return null
      }
    } catch (error) {
      console.error('Error getting document: ', error)
      throw error
    }
  },
  async updateProduct(id: string, productData: object) {
    try {
      const docRef = doc(db, 'products', id)
      await updateDoc(docRef, productData)
      return { id, ...productData }
    } catch (error) {
      console.error('Error getting document: ', error)
      throw error
    }
  },
  async deleteProduct(id: string) {
    try {
      const docRef = doc(db, 'products', id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error getting document: ', error)
      throw error
    }
  },
}
