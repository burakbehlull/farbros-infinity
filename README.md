# Farbros Infinity v2

**Managers** classes:
| Class | About |
| -------- | -------- |
| **baseManager** | Joint management class of classes | 
| **authorityManager** | Authority management class |
| **punishManager** | Punisher management class |

<br />

**libs** classes:
| Class | About |
| -------- | -------- |
| **themeBuilder** | Style themes and user utils | 
| **base** | Bot base starter home class |

### Example theme builder class
```js
import { themeBuilder } from '#libs'
import { themes } from '#data'

const tb = new themeBuilder(unkown) // interaction || message

const theme = tb.embedThemeBuilder(themes.success, {
  action: false,
  author: tb.getNameAndAvatars("guild"),
  description: "example",
  footer: tb.getNameAndAvatars("user")
})

tb.send({embed: theme, id: "channel id"})

tb.send({embed: theme, reply: true}) // reaction: reply
tb.send({embed: theme}) // reaction: message in channel

// action is true
theme.reply() 
theme.send()
```

**themes**:
` success ` ` error ` ` warn ` ` rich ` ` classic `

**themeBuilder** functions:
| Function | About |
| -------- | -------- |
| **randomColor** | Generater random color | 
| **getNameAndAvatars** | options: "user" and "guild", fetch name and avatar |
| **createTheme** | Generater theme |
| **embedThemeBuilder** | Uses ready theme |

**helper** functions:
| Class | About |
| -------- | -------- |
| **components** | Bot interaction utils | 
| **loaders** | Bot file loader functions |
| **misc** | General utils |


| Genre | About | Link |
| -------- | -------- | -------- |
| Guard | **A protection bot with a different infrastructure, written in commonjs** | [Farbros Infinity v1](https://github.com/burakbehlull/farbros-infinity-v1) | 
| Bot Management | **Multi-bot management system written with modern infrastructure** | [Farbros Management](https://github.com/burakbehlull/farbros-management) |
| Moderation | **Level, statistics, server moderation bot** | [Midnight](https://github.com/burakbehlull/midnight) |



