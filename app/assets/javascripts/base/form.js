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
            var sending = false;

            // Campos a Validar
            var email = $("input[name*='email']", form);
            var password = $("input[name*='password']", form);
            var btn = $(".btn-send", form);

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

                if ( ! sending ) {
                    sending = true;
                    btn.addClass("btn-sending");

                    $.ajax({
                        url: form.attr("action"),
                        data: data,
                        method: 'POST',
                        complete: function( res ) {
                            sending = false;
                            var data = res.responseJSON;

                            if ( data.status == 'SUCCESS' ) {
                                window.location.reload();
                            } else {
                                $('.error_ajax', form).html("Usuario y/o contraseña incorrectos.").fadeIn('fast');
                            }

                            btn.removeClass("btn-sending");
                        }
                    });
                }
            }
        });
    },

    SignUp: function(){
        $(document).on('submit', '.form-sign-up', function (e){
            e.preventDefault();
            var form = $(this);
            var error = false;
            var sending = false;

            // Campos a Validar
            var name = $("input[name*='name']", form);
            var email = $("input[name*='email']", form);
            var password = $("input[name*='password']", form);
            var phone = $("input[name*='phone']", form);
            var btn = $(".btn-send", form);

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

                if ( ! sending ) {
                    sending = true;
                    btn.addClass("btn-sending");

                    $.ajax({
                        url: form.attr("action"),
                        data: data,
                        method: 'POST',
                        complete: function( res ) {
                            sending = false;
                            var data = res.responseJSON;

                            if ( res.status == 200 ) {
                                window.location.reload();
                            } else if ( res.status == 406 ) {
                                $('.error_ajax', form).html("El correo ya existe en nuestra base de datos.").fadeIn('fast');
                            } else {
                                $('.error_ajax', form).html("Error desconocido, intentalo más tarde.").fadeIn('fast');
                            }

                            btn.removeClass("btn-sending");
                        }
                    });
                }
            }
        });
    },

    LostPassword: function(){
        $(document).on('submit', '.form-lost-password', function (e){
            e.preventDefault();
            var form = $(this);
            var error = false;
            var sending = false;

            // Campos a Validar
            var email = $("input[name*='email']", form);
            var btn = $(".btn-send", form);

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

                if ( ! sending ) {
                    sending = true;
                    btn.addClass("btn-sending");

                    $.ajax({
                        url: form.attr("action"),
                        data: data,
                        method: 'POST',
                        complete: function( res ) {
                            sending = false;
                            var data = res.responseJSON;

                            if ( data.status == 'SUCCESS' ) {
                                $('.error_ajax', form).hide();
                                $('.success_ajax', form).html("Correo enviado con éxito.").fadeIn('fast');
                            } else {
                                $('.success_ajax', form).hide();
                                $('.error_ajax', form).html("Correo electrónico no encontrado.").fadeIn('fast');
                            }

                            btn.removeClass("btn-sending");
                        }
                    });
                }
            }
        });
    },

    filters: function () {
        // Solo números
        onlyNumbers ( $("input[name*='phone']") );
    }
};
