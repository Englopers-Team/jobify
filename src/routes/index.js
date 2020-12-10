import { BrowserRouter,Switch, Route } from 'react-router-dom';
import NotFound from '../components/not-found';
import Home from '../components/home';
import AdminDashboard from '../components/admin/dashboard';
import Block from '../components/admin/block';
import AdminReports from '../components/admin/reports';
import AdminReportsDetails from '../components/admin/reports/details';
import Posts from '../components/admin/posts';
import PostsDetails from '../components/admin/posts/details';
import API from '../components/api';
import Signin from '../components/auth/signin';
import Signup from '../components/auth/signup';
import Verify from '../components/auth/verify';
import Community from '../components/community';
import SubmitPost from '../components/community/new-post';
import PostDetails from '../components/community/post-details';
import EditPost from '../components/community/edit-post';
import SubmitedJobs from '../components/company/my-jobs/index';
import EditJob from '../components/company/my-jobs/edit-job';
import CompanyApplications from '../components/company/applications';
import CompanyEdit from '../components/company/edit-profile';
import SubmitJob from '../components/company/new-job';
import CompanyOffers from '../components/company/offers';
import Reports from '../components/report/';
import ReportDetails from '../components/report/details';
import SubmitReport from '../components/report/new-report';
import SearchCompany from '../components/search/company';
import SearchEmployees from '../components/search/employees';
import SearchJobs from '../components/search/jobs';
import ApplicantEdit from '../components/user/edit-profile';
import ApplicantApplications from '../components/user/my-applications';
import ApplicantOffers from '../components/user/offers';
import ApplicantSavedJobs from '../components/user/saved-jobs';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />

      <Route exact path='/admin' component={AdminDashboard} />
      <Route exact path='/admin/block' component={Block} />
      <Route exact path='/admin/reports' component={AdminReports} />
      <Route exact path='/admin/reports/:id' component={AdminReportsDetails} />
      <Route exact path='/admin/posts' component={Posts} />
      <Route exact path='/admin/posts/:id' component={PostsDetails} />

      <Route exact path='/api' component={API} />

      <Route exact path='/signin' component={Signin} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/verify' component={Verify} />

      <Route exact path='/community' component={Community} />
      <Route exact path='/community/submit' component={SubmitPost} />
      <Route exact path='/community/posts/:id' component={PostDetails} />
      <Route exact path='/community/edit/:id' component={EditPost} />

      <Route exact path='/company/submitted-jobs' component={SubmitedJobs} />
      <Route exact path='/company/submitted-jobs/:id' component={EditJob} />
      <Route exact path='/company/applications' component={CompanyApplications} />
      <Route exact path='/company/edit-profile' component={CompanyEdit} />
      <Route exact path='/company/submit-job' component={SubmitJob} />
      <Route exact path='/company/offers' component={CompanyOffers} />

      <Route exact path='/reports/' component={Reports} />
      <Route exact path='/reports/submit' component={ReportDetails} />
      <Route exact path='/reports/:id' component={SubmitReport} />

      <Route exact path='/search/jobs' component={SearchCompany} />
      <Route exact path='/search/company' component={SearchEmployees} />
      <Route exact path='/search/employees' component={SearchJobs} />

      <Route exact path='/applicant/edit-profile' component={ApplicantEdit} />
      <Route exact path='/applicant/applications' component={ApplicantApplications} />
      <Route exact path='/applicant/offers' component={ApplicantOffers} />
      <Route exact path='/applicant/saved-jobs' component={ApplicantSavedJobs} />

      <Route component={NotFound} />
    </Switch>
  );
}
