import {
    Routes,
    Route,
  } from "react-router-dom";
  import CreaturesPage from "./Pages/Cretures/CreaturesPage";
  import CriptoDatesPage from "./Pages/Date/CriptoDatesPage";
  import CreatureAddPage from "./Pages/Cretures/CreatureAddPage";
  import DateAddPage from "./Pages/Date/DateAddPage";
  import Home from "./Pages/Home";
  import LoginPage from "./Pages/Users/LoginPage";
  import RegisterPage from "./Pages/Users/RegisterPage";
  import DateDetailsPage from "./Pages/Date/DateDetailsPage";
  
  export default function NavigationList() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/cadastrar" element={<RegisterPage />} />
            <Route exact path="/criptidios" element={<CreaturesPage />} />
            <Route exact path="/dates" element={<CriptoDatesPage />} />
            <Route exact path="/cadastrar-criptidio" element={<CreatureAddPage />} />
            <Route exact path="/cadastrar-date" element={<DateAddPage />} />
            <Route exact path="/detalhes-date/:idDate" element={<DateDetailsPage />} />

            {/* <Route exact path="/pacientes" element={<PatientsPage />} />
            <Route exact path="/pacientes/:idPatient" element={<PatientPage />} />
            <Route exact path="/pacientes/novo" element={<StorePatientPage />} />
            <Route exact path="/pacientes/editar/:idPatient" element={<UpdatePatientPage />} /> */}
        </Routes>
    );
  }