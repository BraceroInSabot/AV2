from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Departament, Address, Function, Employee

# Department

class DepartamentListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            dep = Departament.objects.all()
        except:
            return Response({"success": False, "message": "Erro ao buscar departamentos."}, status=400)

        data = {
            "departments": [
                {
                    "id": department.department_ID,
                    "name": department.department_name,
                    "description": department.department_description,
                } for department in dep
            ]
        }
        return Response({"success": True, "data": data}, status=200)

class DepartamentDetailView(APIView):
    def get(self, request, *args, **kwargs):
        dep_code = kwargs.get('pk')
        if not dep_code:
            return Response({"success": False, "message": "Código do Departamento é necessário."}, status=400)

        try:
            dep = Departament.objects.get(department_ID=dep_code)
        except Departament.DoesNotExist:
            return Response({"success": False, "message": "Departamento não encontrado."}, status=404)
        except Exception as e:
            return Response({"success": False, "message": f"Erro ao buscar departamento: {str(e)}"}, status=400)

        data = {
            "id": dep.department_ID,
            "name": dep.department_name,
            "description": dep.department_description,
            "phone": dep.department_phone,
            "created_at": dep.department_created_at.strftime('%H:%M - %d/%m/%Y') if dep.department_created_at else None,
            "manager": dep.department_manager,
            "address": {
                "street": dep.department_address.address_street if dep.department_address else None,
                'neighborhood': dep.department_address.address_neighborhood if dep.department_address else None,
                "number": dep.department_address.address_number if dep.department_address else None,
                "city": dep.department_address.address_city if dep.department_address else None,
                "zip_code": dep.department_address.address_zip_code if dep.department_address else None,
                "country": dep.department_address.address_country if dep.department_address else None
            }
        }

        return Response({"success": True, "data": data}, status=200)

class DepartmentCreateView(APIView):
    def post(self, request):
        data = request.data
        address_data = data.get('address', {})

        # Validações básicas
        if not data.get('name'):
            return Response({"success": False, "message": "O nome do departamento é obrigatório."}, status=400)

        if not address_data:
            return Response({"success": False, "message": "Os dados de endereço são obrigatórios."}, status=400)

        # print(request.data)
        # print(address_data)
       
        print(address_data.get('uf'))
        # Criação do endereço
        address = Address.objects.create(
            address_street=address_data.get('street'),
            address_neighborhood=address_data.get('neighborhood'),
            address_number=address_data.get('number'),
            address_zip_code=address_data.get('zip_code'),
            address_city=address_data.get('city'),
            address_country=address_data.get('country')
        )

        # Criação do departamento
        department = Departament.objects.create(
            department_name=data.get('name'),
            department_description=data.get('description'),
            department_phone=data.get('phone'),
            department_manager=data.get('manager'),
            department_address=address
        )
        return Response(
            {"success": True, "message": "Departamento criado com sucesso."},
            status=201
        )        

class DepartmentUpdateView(APIView):
    def put(self, request, pk):
        data = request.data
        try:
            department = Departament.objects.get(department_ID=pk)
        except Departament.DoesNotExist:
            return Response({"success": False, "message": "Departamento não encontrado."}, status=404)

        if 'department_name' in data:
            department.department_name = data['department_name']
        if 'department_description' in data:
            department.department_description = data['department_description']
        if 'department_phone' in data:
            department.department_phone = data['department_phone']
        if 'department_manager' in data:
            department.department_manager = data['department_manager']

        if 'address' in data:
            address_data = data['address']
            address, created = Address.objects.update_or_create(
                address_ID=department.department_address.address_ID,
                defaults={
                    'address_street': address_data.get('address_street'),
                    'address_city': address_data.get('address_city'),
                    'address_state': address_data.get('address_state'),
                    'address_zip_code': address_data.get('address_zip_code'),
                    'address_country': address_data.get('address_country')
                }
            )
            department.department_address = address

        department.save()
        return Response({"success": True, "message": "Departamento atualizado com sucesso."}, status=200)

class DepartmentDeleteView(APIView):
    def delete(self, request, pk):
        try:
            department = Departament.objects.get(department_ID=pk)
            department.delete()
            return Response({"success": True, "message": "Departamento deletado com sucesso."}, status=204)
        except Departament.DoesNotExist:
            return Response({"success": False, "message": "Departamento não encontrado."}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        
# Employees

class EmployeeListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk=None):
        department = Departament.objects.get(department_ID=pk)
        try:
            employees = Employee.objects.filter(employee_department=department)
        except:
            return Response({"success": False, "message": "Erro ao buscar funcionários."}, status=400)

        data = {
            "employees": [
                {
                    "id": employee.employee_ID,
                    "name": employee.employee_name,
                    "function_title": employee.employee_function.function_title if employee.employee_function else "Não definido", 
                } for employee in employees
            ]
        }
        return Response({"success": True, "data": data}, status=200)
    
class EmployeeDetailView(APIView):
    def get(self, request, pk, fpk):
        try:
            employee = Employee.objects.get(
                employee_ID=fpk,
                employee_department__department_ID=pk
            )
        except Employee.DoesNotExist:
            return Response({"success": False, "message": "Funcionário não encontrado."}, status=404)
        except Exception as e:
            return Response({"success": False, "message": f"Erro ao buscar funcionário: {str(e)}"}, status=400)

        data = {
            "name": employee.employee_name,
            "email": employee.employee_email,
            "phone": employee.employee_phone,
            "birth_date": employee.employee_birth_date.strftime('%d/%m/%Y') if employee.employee_birth_date else 'Não informado',
            "hire_date": employee.employee_hire_date.strftime('%H:%M - %d/%m/%Y') if employee.employee_hire_date else 'Não informado',
            "department": {
                "name": employee.employee_department.department_name,
                "description": employee.employee_department.department_description,
            },
            "address": {
                "street": employee.employee_address.address_street if employee.employee_address else None,
                "neighborhood": employee.employee_address.address_neighborhood if employee.employee_address else None,
                "number": employee.employee_address.address_number if employee.employee_address else None,
                "city": employee.employee_address.address_city if employee.employee_address else None,
                "zip_code": employee.employee_address.address_zip_code if employee.employee_address else None,
                "country": employee.employee_address.address_country if employee.employee_address else None
            },
            "function": {
                "title": employee.employee_function.function_title if employee.employee_function else "Não definido",
                "salary": str(employee.employee_function.function_salary) if employee.employee_function and employee.employee_function.function_salary else "Não definido"
            }
        }

        return Response({"success": True, "data": data}, status=200)
    
class EmployeeCreateView(APIView):
    def post(self, request, pk):
        data = request.data
        try:
            department = Departament.objects.get(department_ID=pk)
        except Departament.DoesNotExist:
            return Response({"success": False, "message": "Departamento não encontrado."}, status=404)

        # Validações básicas
        if not data.get('name'):
            return Response({"success": False, "message": "O nome do funcionário é obrigatório."}, status=400)

        # Criação do endereço se fornecido
        address_data = data.get('address', {})
        address = None
        if address_data:
            address = Address.objects.create(
                address_street=address_data.get('street'),
                address_neighborhood=address_data.get('neighborhood'),
                address_number=address_data.get('number'),
                address_city=address_data.get('city'),
                address_zip_code=address_data.get('zip_code'),
                address_country=address_data.get('country')
            )

        # Criação da função se fornecida
        function_data = data.get('function', {})
        function = None
        if function_data:
            function = Function.objects.create(
                function_title=function_data.get('title'),
                function_salary=function_data.get('salary')
            )

        # Criação do funcionário
        employee = Employee.objects.create(
            employee_name=data['name'],
            employee_email=data.get('email'),
            employee_phone=data.get('phone'),
            employee_birth_date=data.get('birth_date'),
            employee_department=department,
            employee_address=address,
            employee_function=function
        )

        return Response(
            {"success": True, "message": "Funcionário criado com sucesso.", "employee_id": employee.employee_ID},
            status=201
        )
    
