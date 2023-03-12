const addScene = set => newScene => {
    set(state => ({
        scenes: [newScene, ...state.scenes],
        mythic: {
            ...state.mythic,
            chaosFactor: newScene.chaosFactor,
        },
    }));
};

const removeScene = set => id => {
    set(state => ({
        scenes: state.scenes.filter(scene => scene.id !== id),
    }));
};

const editScene = set => newSceneData => {
    set(state => ({
        scenes: state.scenes.map(scene => {
            if (scene.id === newSceneData.id) {
                return { ...scene, ...newSceneData };
            }
            return scene;
        }),
    }));
};

export const sceneActions = set => ({
    addScene: addScene(set),
    removeScene: removeScene(set),
    editScene: editScene(set),
});