import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { db, auth } from '@/utility/firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { ROLE_ADMIN, ROLE_USER } from '@/constants/appContant'
import { useRouter } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'

export const UseAuthStore = defineStore('authStore', () => {
  const user = ref()
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const router = useRouter()
  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === ROLE_ADMIN)
  const initialize = ref<boolean>(false)
  const role = ref<string | null>(null)

  const initializeAuth = async () => {
    console.log('initializeAuth called')
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        await fetchUserRole(firebaseUser.uid)
        initialize.value = true
      } else {
        clearUser()
      }
    })
  }

  const clearUser = () => {
    user.value = null
  }

  const fetchUserRole = async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid))
    role.value = userDoc.exists() ? userDoc.data().role : null
  }

  const signUpUser = async (email: string, password: string) => {
    if (!email || !password) {
      error.value = 'Vui lòng nhập đầy đủ email và mật khẩu'
      return
    }
    isLoading.value = true
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', userCredentials.user.uid), {
        uid: userCredentials.user.uid,
        email: email,
        role: ROLE_USER,
        createdAt: new Date(),
      })

      error.value = null
      await auth.signOut()
      clearUser()
      await router.push({ name: APP_ROUTE_NAMES.SIGN_IN })
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
        console.error('Lỗi khi đăng ký:', err)
        throw err
      }
    } finally {
      isLoading.value = false
    }
  }

  const signInUser = async (email: string, password: string) => {
    isLoading.value = true
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredentials.user
      error.value = null
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  const signOutUser = async () => {
    isLoading.value = true
    try {
      await signOut(auth)
      clearUser()
      error.value = null
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    error,
    role,
    isLoading,
    initialize,

    isAuthenticated,
    isAdmin,

    signUpUser,
    signInUser,
    signOutUser,
    initializeAuth,
  }
})
