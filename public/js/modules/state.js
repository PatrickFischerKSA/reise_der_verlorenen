const defaultDraft = () => ({
  annotationId: null,
  segmentId: null,
  taskId: "",
  type: "deutungshypothese",
  tags: "",
  quote: "",
  body: ""
});

export const state = {
  bootstrap: null,
  viewerId: "user-teacher-mara",
  selectedWorkspaceId: null,
  selectedSegmentId: null,
  selectedAnnotationId: null,
  compareResult: null,
  commentDraft: "",
  reviewDraft: "",
  filters: {
    type: "all"
  },
  annotationDraft: defaultDraft()
};

export function resetDraft(overrides = {}) {
  state.annotationDraft = {
    ...defaultDraft(),
    ...overrides
  };
}

export function applyBootstrap(bootstrap) {
  state.bootstrap = bootstrap;
  state.viewerId = bootstrap.viewer.id;

  const workspaceExists = bootstrap.workspaces.some((workspace) => workspace.id === state.selectedWorkspaceId);
  if (!workspaceExists) {
    state.selectedWorkspaceId = bootstrap.primaryWorkspaceId;
  }

  const currentWorkspace = bootstrap.workspaces.find((workspace) => workspace.id === state.selectedWorkspaceId);
  const selectedSegmentStillVisible = bootstrap.segments.some((segment) => segment.id === state.selectedSegmentId);
  if (!selectedSegmentStillVisible) {
    state.selectedSegmentId = bootstrap.segments[0]?.id || null;
  }

  const currentAnnotationExists = currentWorkspace?.annotations.some((annotation) => annotation.id === state.selectedAnnotationId);
  if (!currentAnnotationExists) {
    state.selectedAnnotationId = currentWorkspace?.annotations[0]?.id || null;
  }

  if (!state.annotationDraft.segmentId) {
    state.annotationDraft.segmentId = state.selectedSegmentId;
  }
}

export function getSelectedWorkspace() {
  return state.bootstrap?.workspaces.find((workspace) => workspace.id === state.selectedWorkspaceId) || null;
}

export function getSelectedAnnotation() {
  const workspace = getSelectedWorkspace();
  return workspace?.annotations.find((annotation) => annotation.id === state.selectedAnnotationId) || null;
}
