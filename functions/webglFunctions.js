/**
 * Created by Alanx on 6/18/16.
 */

// Get a WebGL context from a html canvas element
function initWebGL(canvas) {
    var gl;
    try 
    {
        gl = canvas.getContext("experimental-webgl");
    }
    catch (e)
    {
        var msg = "Error creating WebGL Context!: " + e.toString();
        alert(msg);
        throw Error(msg);
    }
    return gl;
}

// Sets the WebGL viewport
function initViewport(gl, canvas)
{
    gl.viewport(0, 0, canvas.width, canvas.height);
}

// Create a vertex buffer that stores the shape's data
function createSquare(g) {
    var vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var verts = [
         .5, .5, 0.0,
        -.5, .5, 0.0,
         .5,-.5, 0.0,
         .5,-.5, 0.0,
    ];
    // Float32Array stores compact binary data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    var square = {buffer:vertexBuffer, vertSize:3, nVerts:4, primtype:gl.TRIANGLE_STRIP};
    return square;
}

// Set up the ModelView and projection matricies
function initMatrices(){
    // The transform matrix for the square - translate back in Z for the camera
    modelViewMatrix = new Float32Array(
        [1, 0, 0, 0,
         0, 1, 0 ,0,
         0, 0, 1, 0,
         0, 0, -3.333, 1]);

    // The projection matrix (for a 45 degree field of view)
    projectionMatrix = new Float32Array(
        [2.4142, 0, 0, 0,
         0, 2.41421, 0 , 0,
         0, 0, -1.002002, -1,
         0, 0, -0.2002002, 0]);
}


var vertexShaderSource =
    " attribute vec3 vertexPos;\n" +
    " uniform mat4 modelViewMatrix;\n" +
    " uniform mat4 projectionMatrix;\n" +
    " void main(void {\n" +
    "   // Return the transformed and projected vertex value\n" +
    "   gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);\n" +
    " }\n";

var fragmentShaderSource =
    " void main(void) {\n" +
    " // Return the pixel color: always output white\n" +
    " gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
    "}\n";

// drawing code
function draw(gl, obj) {
    // clear the background (with black)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // set the vertex buffer to be drawn
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);

    // set the shader to use
    gl.useProgram(shaderProgram);

    // connect up the shader parameters: vertex position and projection/model matrices
    gl.vertexAttribPointer(shaderVertexPositionAttribute,
        obj.vertSize, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);

    // draw the object
    gl.drawArrays(obj.primtype, 0, obj.nVerts);
}
