var Form = {
    init: function(){
        this.SignIn();
        this.SignUp();
        this.LostPassword();

        this.filters();
    },

    SignIn: function(){
        $(document).on('submit', '.form-sign-in', function (e){
            e.preventDefault();
            var form = $(this);
            var error = false;

            // Campos a Validar
            var email = $("input[name*='email']", form);
            var password = $("input[name*='password']", form);

            // Correo electrónico
            if ( $.trim(email.val()) == "" ) {
                error = true;
                email.addClass("error");
                addInputError( email, "Por favor, ingrese su correo electrónico." );
            } else {
                if ( ! isEmail(email.val()) ) {
                    error = true;
                    email.addClass("error");
                    addInputError( email, "Por favor, ingrese un correo válido." );
                } else {
                    email.removeClass("error");
                    removeInputError( email );
                }
            }

            // Contraseña
            if ( $.trim(password.val()) == "" ) {
                error = true;
                password.addClass("error");
                addInputError( password, "Por favor, su contraseña." );
            } else {
                password.removeClass("error");
                removeInputError( password );
            }

            if ( ! error ) {
                var data = {
                    email: email.val(),
                    password: password.val()
                };

                $.ajax({
                    url: form.attr("action"),
                    data: data,
                    method: 'POST',
                    complete: function( res ) {
                        var data = res.responseJSON;
                        if ( data.status == 'SUCCESS' ) {
                            window.location.reload();
                        } else {
                            $('.error_ajax', form).html("Usuario y/o contraseña incorrectos.").fadeIn('fast');
                        }
                    }
                });
            }
        });
    },

    SignUp: function(){
        $(document).on('submit', '.form-sign-up', function (e){
            e.preventDefault();
            var form = $(this);
            var error = false;

            // Campos a Validar
            var name = $("input[name*='name']", form);
            var email = $("input[name*='email']", form);
            var password = $("input[name*='password']", form);
            var phone = $("input[name*='phone']", form);

            // Validar campos antes de enviarlos por AJAX
            // Nombre completo
            if ( $.trim(name.val()) == "" ) {
                error = true;
                name.addClass("error");
                addInputError( name, "Por favor, ingrese su nombre completo." );
            } else {
                name.removeClass("error");
                removeInputError( name );
            }

            // Correo electrónico
            if ( $.trim(email.val()) == "" ) {
                error = true;
                email.addClass("error");
                addInputError( email, "Por favor, ingrese su correo electrónico." );
            } else {
                if ( ! isEmail(email.val()) ) {
                    error = true;
                    email.addClass("error");
                    addInputError( email, "Por favor, ingrese un correo válido." );
                } else {
                    email.removeClass("error");
                    removeInputError( email );
                }
            }

            // Contraseña
            if ( $.trim(password.val()) == "" ) {
                error = true;
                password.addClass("error");
                addInputError( password, "Por favor, una contraseña." );
            } else {
                password.removeClass("error");
                removeInputError( password );
            }

            // Teléfono
            if ( $.trim(phone.val()) == "" ) {
                error = true;
                phone.addClass("error");
                addInputError( phone, "Por favor, su número telefónico." );
            } else {
                phone.removeClass("error");
                removeInputError( phone );
            }

            // Enviar Datos
            if ( ! error ) {
                var data = {
                    name: name.val(),
                    email: email.val(),
                    password: password.val(),
                    phone: phone.val()
                };

                $.ajax({
                    url: form.attr("action"),
                    data: data,
                    method: 'POST',
                    complete: function( res ) {
                        var data = res.responseJSON;

                        if ( res.status == 200 ) {
                            //
                        } else if ( res.status == 406 ) {
                            alert("El correo ya existe en nuestra base de datos.");
                        } else {
                            alert("Error creando al usuario.");
                        }

                    }
                });
            }
        });
    },

    LostPassword: function(){
        $(document).on('submit', '.form-lost-password', function (e){
            e.preventDefault();
            var form = $(this);
            var error = false;

            // Campos a Validar
            var email = $("input[name*='email']", form);

            // Correo electrónico
            if ( $.trim(email.val()) == "" ) {
                error = true;
                email.addClass("error");
                addInputError( email, "Por favor, ingrese su correo electrónico." );
            } else {
                if ( ! isEmail(email.val()) ) {
                    error = true;
                    email.addClass("error");
                    addInputError( email, "Por favor, ingrese un correo válido." );
                } else {
                    email.removeClass("error");
                    removeInputError( email );
                }
            }

            if ( ! error ) {
                var data = {
                    email: email.val()
                };

                $.ajax({
                    url: form.attr("action"),
                    data: data,
                    method: 'POST',
                    complete: function( res ) {
                        var data = res.responseJSON;
                        if ( data.status == 'SUCCESS' ) {
                            $('.error_ajax', form).hide();
                            $('.success_ajax', form).html("Correo enviado con éxito.").fadeIn('fast');
                        } else {
                            $('.success_ajax', form).hide();
                            $('.error_ajax', form).html("Correo electrónico no encontrado.").fadeIn('fast');
                        }
                    }
                });
            }
        });
    },

    filters: function () {
        // Solo números
        onlyNumbers ( $("input[name*='phone']") );
    }
};
