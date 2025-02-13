/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {useMemo} from 'react'
import { createContext, useState } from 'react'

export const DoctorDataContext = createContext();

const DoctorContext = ({children}) => {
    const [doctor, setDoctor] = useState(null);

    const loggedIn = useMemo(() => doctor !== null, [doctor]);
  return (
    <>
        <DoctorDataContext.Provider value={{ doctor, setDoctor, loggedIn }}>
            {children}
        </DoctorDataContext.Provider>
    </>
  )
}

export default DoctorContext