

const serverStore = create((set)=>({
    serverId: '',
    setServerId: (id)=> set({serverId: id})
}))

export default serverStore