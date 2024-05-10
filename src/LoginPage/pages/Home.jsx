export default function Home(){
    return(
        <div>
        <button>
            <a href={'/login'}>login</a>
        </button>
        <button>
            <a href={'/signup'}>register</a>
        </button>
        <button>
            <a href="/Calendar">Calendar</a>
        </button>
        <button>
            <a href="/Teamwall">Teamwall</a>
        </button>
        </div>
    )
}