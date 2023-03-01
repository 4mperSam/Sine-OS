const state_expressions = [
    // predefines
    {
        "type": "folder",
        "id": "Windows Folder",
        "title": "Windows",
        "collapsed": true
    },

    // JS 

    {
        "type": "folder",
        "id": "Javascript Folder",
        "title": "JS",
        "collapsed": true
    },
    {
        "type": "expression",
        "id": "Mouse Position",
        "folderId": "Javascript Folder",
        "color": "#c74440",
        "latex": "M_{ousePosition}=(0,0)",
        "hidden": true
    },
    {
        "type": "expression",
        "id": "Keyboard Press",
        "folderId": "Javascript Folder",
        "color": "#2d70b3",
        "latex": "K_{eyPress}(0)"
    },
    {
        "type": "expression",
        "id": "Keyboard Down",
        "folderId": "Javascript Folder",
        "color": "#388c46",
        "latex": "K_{eyDown}(0)"
    },
    {
        "type": "expression",
        "id": "Keyboard Up",
        "folderId": "Javascript Folder",
        "color": "#6042a6",
        "latex": "K_{eyUp}()"
    },

    // Cursor

    {
        "type": "folder",
        "id": "Cursor Folder",
        "title": "Cursor",
        "collapsed": true
    },
    {
        "type": "expression",
        "id": "Cursor Caller",
        "folderId": "Cursor Folder",
        "color": "#c74440",
        "latex": "C_{ursor}\\left(M_{ousePosition}\\right)"
    },
    {
        "type": "expression",
        "id": "Cursor",
        "folderId": "Cursor Folder",
        "color": "#000000",
        "latex": "C_{ursor}\\left(p\\right)=\\operatorname{polygon}\\left(\\left(p.x,0.5+p.y-0.5\\right),\\left(p.x,p.y-0.5\\right),\\left(0.11+p.x,0.166+p.y-0.5\\right),\\left(0.33+p.x,0.083+p.y-0.5\\right)\\right)"
    },

    // Graph Data

    {
        "type": "folder",
        "id": "Graph Data",
        "title": "Graph Data",
        "collapsed": true
    },
    {
        "type": "expression",
        "id": "Runtime",
        "folderId": "Graph Data",
        "color": "#c74440",
        "latex": "R_{untime}=0",
        "hidden": true
    },

    // Async

    {
        "type": "folder",
        "id": "Async Folder",
        "title": "Async"
    },
    {
        "type": "expression",
        "id": "Thread Count",
        "folderId": "Async Folder",
        "color": "#2d70b3",
        "latex": "T_{hreadCount}=4"
    },
    {
        "type": "expression",
        "id": "Current Thread",
        "folderId": "Async Folder",
        "color": "#6042a6",
        "latex": "C_{urrentThread}=1"
    },

    // Thread Functions

    {
        "type": "folder",
        "id": "Thread Functions",
        "title": "Threads"
    },
    {
        "type": "expression",
        "id": "Thread1",
        "folderId": "Thread Functions",
        "color": "#6042a6",
        "latex": "T_{hreadOne}=a->0"
    },
    {
        "type": "expression",
        "id": "Thread2",
        "folderId": "Thread Functions",
        "color": "#6042a6",
        "latex": "T_{hreadTwo}=a->1"
    },
    {
        "type": "expression",
        "id": "Thread3",
        "folderId": "Thread Functions",
        "color": "#6042a6",
        "latex": "T_{hreadThree}=a->2"
    },
    {
        "type": "expression",
        "id": "Thread4",
        "folderId": "Thread Functions",
        "color": "#6042a6",
        "latex": "T_{hreadFour}=a->3"
    },
    {
        "type": "expression",
        "id": "a",
        "folderId": "",
        "color": "#6042a6",
        "latex": "a=0"
    },
]

const default_state = {
    "version": 10,
    "randomSeed": "b3e5a2cef0ea7db249a9a32b01b14901",
    "graph": {
        "viewport": {
            "xmin": -10,
            "ymin": -10,
            "xmax": 10,
            "ymax": 10
        }
    },
    "expressions": {
        "list": state_expressions
    }
}

const blank_expression = {
    "type": "expression",
    "id": "",
    "color": "#c74440",
    "latex": "",
    "hidden": true
}
let Root = Calc._calc.rootElt
let Rect = Root.getBoundingClientRect()

let Default_Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAAXNSR0IArs4c6QAAAPVJREFUKFNNUsF2wzAMAu///7Vt7N5i9kBWNp0cWyAQ4Wd+BQhdJAARN4Tx3AIUcA+Cn7nSvdNA96a4BZLYJCghPL7/XCtfdPOZtIGwB7yFESAgEbzmklmMN1NBG1zfBj5v77XULDV4H1mWUnL2MNmIbMa0BOWS2CDGmRSnR9qIPoGvuVR6i00sYFVvzwaizhOmfIpRn85br8H+PPDHiAKsGuY0Ru37f9XbH9ORVPqM9JSISVMSqVw6h/eaejQfnSc6kMKtyqQ98TW/GtbXkmym0669HPYaHQ8VTPM67xZQYrI5Rx3T1xKHo8hyT6qP4me1/bv8AgnkrfkQkwgFAAAAAElFTkSuQmCC'

let HelperFuncs = []

let TickData = {
    done: false,
    runtime: 0,
    thread: 1,
    previous_time: 0,
    current_time: 0,
    tps: 1000 / 60,
}

Root.style.cursor = 'none'

function addFolder(settings) {
    let temp = Calc.getState()
    temp.expressions.list.push({
        type: "folder",
        id: settings.id,
        title: settings.title,
        collapsed: settings.collapsed || false
    })
    Calc.setState(temp)
}

function idToIndex(id) {
    let temp = Calc.getState()
    for (let i = 0; i < temp.expressions.list.length; i++) {
        if (temp.expressions.list[i].id == id) {
            return i
        }
    }
}

function fireAction(id) {
    Calc.controller.dispatcher.dispatch({
        type: 'action-single-step',
        id: id
    })
}

function addState(exp, folder) {
    let stet = Calc.getState(),
        expressions = stet.expressions.list

    expressions.splice(
        expressions.findIndex(e => e.id === folder) + 1,
        0, {
            type: 'expression',
            id: exp.id,
            folderId: folder,
            latex: exp.latex,
        }
    )

    Calc.setState(stet)
}

addState({
    id: `My Window Data`,
    latex: 'x=1'
}, 'Windows Folder')
let window_objects = [{
    name: 'window 1',
    index: 1,
    position: [0, 0],
    sides: [3, 3, 3, 3],
    opacity: 0,
    minimized: 0,
    fullscreen: 0
}]

let Mos17Sys = {
    memory: {},
    functions: {
        graphics: function(args) {
            args = args.split(',')
            if (args[0] == '-n') {
                args = args.slice(2, args.length)
                window_objects.push({
                    name: args[0],
                    index: 1,
                    position: [0, 0],
                    sides: [3, 3, 3, 3],
                    opacity: 0,
                    minimized: 0,
                    fullscreen: 0
                })
            }

            if (args[0] == '-lw') {
                args = args.slice(1, args.length)
                load_window(args)
                return
            }
        },

        // datatypes
        int: function(args) {
            return parseInt(args)
        },
        str: function(args) {
            return args.toString()
        },
        bool: function(args) {
            return (args == 'true')
        },
    },
    file_system: {
        '~': {}
    },
    data: {
        cwd: ['~']
    }
}

function executeCommand(cmd) {
    let tokens = cmd.split(' ')

    if (tokens[0].charAt(0) == '@') {
        let func = tokens[0].substring(1)
        let args = tokens.slice(1, tokens.length)
        eval(`Mos17Sys.functions['${func}']('${args}')`)
        return
    }

    let fs = Mos17Sys.file_system
    let cwd = (Mos17Sys.data.cwd)
    let value;
    let temp;

    switch (tokens[0]) {
        case 'set':
            //run func
            if (tokens[2].charAt(0) == '@') {
                let func = tokens[2].substring(1)
                let args = tokens.slice(3, tokens.length)
                let value = eval(`Mos17Sys.functions['${func}']('${args}')`)
                Mos17Sys.memory[tokens[1]] = value
            }
            else {
                value = tokens.slice(2, tokens.length)
                    .join(' ')
                Mos17Sys.memory[tokens[1]] = value
            }
            return

        case 'goto':
            value = tokens[1].split('/')
            for (let i = 0; i < value.length; i++) {
                if (value[i] == '..') {
                    if (cwd == '~') {
                        console.log('Your at the ~ dir, no going past this!')
                    }
                    else {
                        cwd = cwd.slice(0, -1)
                    }
                }
                else {
                    cwd.push(value[i])
                }
            }

            Mos17Sys.data.cwd = cwd

            break

        case 'pwd':
            break

        case 'addfile':
            value = tokens[1].split('/')
            temp = fs
            for (let i = 0; i < cwd.length; i++) {
                temp = temp[cwd[i]]
            }
            console.log(temp)
            break

            return
    }
}

executeCommand('goto hello/hi') let DefaultCursorLatex = 'C_{ursor}\\left(p\\right)=\\operatorname{polygon}\\left(\\left(p.x,0.5+p.y-0.5\\right),\\left(p.x,p.y-0.5\\right),\\left(0.11+p.x,0.166+p.y-0.5\\right),\\left(0.33+p.x,0.083+p.y-0.5\\right)\\right)'

Calc.setState(default_state)

let AngFunc = 'a_{ng}\\left(A,B\\right)=\\arctan\\left(A.xB.y\\ -\\ A.yB.x,A.xB.x\\ +\\ A.yB.y\\right)'
let InPolyFunc = 'i_{nsidePoly}\\left(p_{1},P_{ts}\\right)=\\operatorname{sign}\\left(\\left|\\operatorname{round}\\left(\\operatorname{total}\\left(\\left[a_{ng}\\left(P_{ts}\\left[i\\right]-p_{1},\\ \\ \\ P_{ts}\\left[i+1\\right]-p_{1}\\right)\\operatorname{for}i=\\left[1...\\operatorname{length}\\left(P_{ts}\\right)-1\\right]\\right]\\right)\\right)\\right|\\right)'
Calc.setExpression({
    id: 'Angle Function',
    latex: AngFunc
})
Calc.setExpression({
    id: 'Inside Poly Function',
    latex: InPolyFunc
})

class custom_window {
    constructor(args) {
        args = args.split(',')
        this.name = args[0]
        this.position = args[1] || '(0,0)'
    }
}

function load_window(args) {
    let data = Mos17Sys.memory[args]
    let wins = window_objects
    let win = wins[wins.length - 1]
    let win_name = `${win.name.charAt(0)}_{${win.name.substring(1)}}`
    let point_name = `${win.name.charAt(0)}_{${win.name.substring(1)}Points}`
    let temp = `${win_name}=[${win.position[0]},${win.position[1]},${win.sides[0]},${win.sides[1]},${win.sides[2]},${win.sides[3]},${win.opacity},${win.minimized},${win.fullscreen}]`
    let temp2 = `\\operatorname{polygon}\\left(\\left(${win_name}\\left[1\\right]-${win_name}\\left[5\\right],${win_name}\\left[2\\right]-${win_name}\\left[4\\right]\\right),\\left(${win_name}\\left[1\\right]+${win_name}\\left[6\\right],${win_name}\\left[2\\right]-${win_name}\\left[4\\right]\\right),\\left(${win_name}\\left[1\\right]+${win_name}\\left[6\\right],${win_name}\\left[2\\right]+${win_name}\\left[3\\right]\\right),\\left(${win_name}\\left[1\\right]-${win_name}\\left[5\\right],${win_name}\\left[2\\right]+${win_name}\\left[3\\right]\\right)\\right)`
    let temp3 = `${point_name}=\\left[\\left(${win_name}\\left[1\\right]-${win_name}\\left[5\\right],${win_name}\\left[2\\right]-${win_name}\\left[4\\right]\\right),\\left(${win_name}\\left[1\\right]+${win_name}\\left[6\\right],${win_name}\\left[2\\right]-${win_name}\\left[4\\right]\\right),\\left(${win_name}\\left[1\\right]+${win_name}\\left[6\\right],${win_name}\\left[2\\right]+${win_name}\\left[3\\right]\\right),\\left(${win_name}\\left[1\\right]-${win_name}\\left[5\\right],${win_name}\\left[2\\right]+${win_name}\\left[3\\right]\\right)\\right]`

    addState({
        id: `${win.name} Data`,
        latex: temp
    }, 'Windows Folder')
    addState({
        id: `${win.name} Hitbox`,
        latex: temp2
    }, 'Windows Folder')
    addState({
        id: `${win.name} PointList`,
        latex: temp3
    }, 'Windows Folder')

    HelperFuncs.push({
        name: win.name,
        func: Calc.HelperExpression({
            latex: `i_{nsidePoly}\\left(M_{ousePosition},${point_name}\\right)`
        })
    })
}

function tick() {

}

executeCommand('set MyWindow @graphics -n window Main')
executeCommand('@graphics -lw MyWindow')

Root.addEventListener('mousemove', (event) => {
    var l = Calc.pixelsToMath({
        x: event.clientX - Rect.left,
        y: event.clientY - Rect.top
    })
    Calc.setExpression({
        id: 'Mouse Position',
        latex: `M_{ousePosition}=(${Math.floor(l.x*100)/100},${Math.floor(l.y*100)/100})`
    })
})

document.addEventListener('keypress', (event) => {
    Calc.setExpression({
        id: 'Keyboard Press',
        latex: `K_{eyPress}(${event.keyCode-32})`
    })
})

document.addEventListener('keydown', (event) => {
    Calc.setExpression({
        id: 'Keyboard Down',
        latex: `K_{eyDown}(${event.keyCode})`
    })
    Calc.setExpression({
        id: 'Keyboard Up',
        latex: `K_{eyUp}(${0})`
    })
})

document.addEventListener('keyup', (event) => {
    Calc.setExpression({
        id: 'Keyboard Up',
        latex: `K_{eyUp}(${event.keyCode})`
    })
    Calc.setExpression({
        id: 'Keyboard Down',
        latex: `K_{eyDown}(${0})`
    })
})

Root.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

Root.addEventListener('mousedown', (event) => {
    for (let i = 0; i < HelperFuncs.length; i++) {
        console.log(HelperFuncs[i])
    }
})

function updateFrame(time) {
    TickData.runtime = time
    Calc.setExpression({
        id: 'Runtime',
        latex: `R_{untime}=${Math.floor(time)/1000}`,
        hidden: true
    })
    TickData.current_time = window.performance.now()

    if (TickData.current_time - TickData.previous_time >= TickData.tps) {
        TickData.previous_time = TickData.current_time
        tick()
    }

    if (!TickData.done) {
        window.requestAnimationFrame(updateFrame)
    }
}

window.requestAnimationFrame(updateFrame)
