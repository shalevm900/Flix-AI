from flask import  render_template, request

class SiteController:
    def render(favorites):
        user_is_logged = request.cookies.get("userIsLogged")

        if user_is_logged and user_is_logged.isdigit():
            user_is_logged = int(user_is_logged)  # Convert to int
        else:
            user_is_logged = None  # Cookie doesn't exist or isn't an integer

        return render_template("index.html", userIsLogged=user_is_logged, favorites=favorites)
