import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsAction from '~/store/ducks/projects';
import MembersAction from '~/store/ducks/members';
import TeamAction from '~/store/ducks/teams';

import { Container, Project } from './styles';

import Can from '~/components/Can';
import Modal from '~/components/Modal';
import Members from '~/components/Members';
import Button from '~/styles/components/Button';

import 'font-awesome/css/font-awesome.css';

class Projects extends Component {
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    openMembersModal: PropTypes.func.isRequired,
    deleteProjectRequest: PropTypes.func.isRequired,
    deleteTeamRequest: PropTypes.func.isRequired,
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
      projectModalOpen: PropTypes.bool,
    }).isRequired,
    members: PropTypes.shape({
      membersModalOpen: PropTypes.bool,
    }).isRequired,
  };

  static defaultProps = {
    activeTeam: null,
  }

  state = {
    newProject: '',
  }

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateProject = (e) => {
    e.preventDefault();

    const { newProject } = this.state;
    const { createProjectRequest } = this.props;

    createProjectRequest(newProject);
  };

  handleDeleteTeam = () => {
    const { deleteTeamRequest } = this.props;
    deleteTeamRequest();
  }

  handleDeleteProject(id) {
    const { deleteProjectRequest } = this.props;
    deleteProjectRequest(id);
  }

  render() {
    const { activeTeam, projects, members, openProjectModal, closeProjectModal, openMembersModal } = this.props;
    const { newProject } = this.state;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={openProjectModal}>
                <i className="fa fa-plus" /> Novo
              </Button>
            </Can>
            <Button onClick={openMembersModal}>Membros</Button>
            <Button color="danger" onClick={this.handleDeleteTeam}><i className="fa fa-trash" /> Excluir</Button>
          </div>
        </header>
        {projects.data.map(project => (
          <Project key={project.id}>
            <p>{project.title}</p>
            <Button color="danger" onClick={() => this.handleDeleteProject(project.id)}><i className="fa fa-trash" /></Button>
          </Project>
        ))}
        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar projeto</h1>
            <form onSubmit={this.handleCreateProject}>
              <span>NOME</span>
              <input name="newProject" value={newProject} onChange={this.handleInputChange} />
              <Button size="big" type="submit" onClick={() => {}}>
                Salvar
              </Button>
              <Button size="small" color="danger" onClick={closeProjectModal}>
                Cancelar
              </Button>
            </form>
          </Modal>
        )}

        {members.membersModalOpen && <Members />}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...ProjectsAction, ...MembersAction, ...TeamAction }, dispatch);

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
  members: state.members,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
