from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Departament, Address, Function, Employee

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
                    "phone": department.department_phone,
                    "created_at": department.department_created_at,
                    "manager": department.department_manager,
                    "address": {
                        "street": department.department_address.address_street if department.department_address else None,
                        'neighborhood': department.department_address.address_neighborhood if department.department_address else None,
                        "number": department.department_address.address_number if department.department_address else None,
                        "city": department.department_address.address_city if department.department_address else None,
                        "zip_code": department.department_address.address_zip_code if department.department_address else None,
                        "country": department.department_address.address_country if department.department_address else None
                    }
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
        if not data.get('department_name'):
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
            address_country=address_data.get('uf')
        )

        # Criação do departamento
        department = Departament.objects.create(
            department_name=data.get('department_name'),
            department_description=data.get('department_description'),
            department_phone=data.get('department_phone'),
            department_manager=data.get('department_manager'),
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