import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
    MyRole: componentLoader.add('MyRole', './my-role'),
    RoleBadge: componentLoader.add('RoleBadge','./role-badge')
}

export { componentLoader, Components }